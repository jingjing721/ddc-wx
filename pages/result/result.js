// pages/result.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
	  resultData: [], // 数据源
    resultBg: '', // 背景桌
	  resultText: '', // 祝福语
	  logo: '../../images/logo.png',
	  close: '../../images/close.png',
	  code: '../../images/code.png',
	  canvasBg: '', // 图片路径
	  saveImgBtnHidden: true, // 保存相册
	  openSettingBtnHidden: false, // 去授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      resultData: JSON.parse(options.resultData),
      resultBg: options.bg,
	    resultText: options.blessText,
    })
  },
	/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
		const ctx = wx.createCanvasContext('canvasId');
		Promise.all([this.getImageInfoBg()].concat(this.getImageInfo())).then((sucRes) => {
			sucRes.shift()  // 只需要 getImageInfo 中的数据
			this.data.resultData.forEach((item, index) => { // 拉取微信服务器数据之后重新复制 开始绘制
				item.foodImg = sucRes[index].path
			})
			this.drawImg(ctx);
			this.drawText(ctx);
			ctx.draw();
			setTimeout(() => {
				this.drawPicture();
			}, 500)
		}, () => {
				app.utils.showToast('图片资源获取失败, 请返回上一页重新拉取资源');
		})
  },
	/*
	 * Description: 绘制图片
	 * Types：ctx -> node
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/12
	 */
	drawImg(ctx) {
		ctx.setFillStyle('#fff')
		ctx.fillRect(0, 0, 375, 500)
		ctx.drawImage(this.data.resultBg, 0, 35, 375, 334); // 绘制背景图
		ctx.drawImage(this.data.logo, 80, 8, 18, 18) // 绘制logo
		ctx.drawImage(this.data.close, 102, 12, 10, 10) // 绘制close
		ctx.drawImage(this.data.code, 270, 330, 100, 100) // 绘制code
		this.data.resultData.sort(this.sortNumber('zindex')) // 排序之后绘制层级
		this.data.resultData.forEach((item) => { // 绘制 手动添加的菜品
			ctx.drawImage(item.foodImg, item.x, item.y + 35, 60, 60);
		})
	},
	/*
	 * Description: 绘制文字
	 * Types：ctx -> node
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/12
	 */
	drawText(ctx) {
		let userInfo = app.utils.getCache('userInfo'); // 获取用户信息
		ctx.setFontSize(14);
		ctx.setFillStyle("#000");
		ctx.fillText(`${userInfo.nickName}的新年餐桌`, 120, 22) // 绘制头信息
		ctx.setTextAlign('center');
		ctx.setFillStyle("#fb7f59");
		ctx.fillText(this.data.resultText, wx.getSystemInfoSync().windowWidth / 2, 60); // 祝福居中
		ctx.setFillStyle("#000");
		ctx.fillText('扫码搭配你的新年餐桌', 170, 400);
		ctx.fillText('日日煮APP，发现生活的味道', 150, 420);
	},
	/*
	 * Description: 对网络图片进行遍历下载之后在绘制canvas
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/12
	 */
	getImagePromiseArr(item) {
	 	return new Promise((resolve, reject) => {
		  wx.getImageInfo({
			  src: item.foodImg, // 服务器返回的带参数的小程序码地址
			  success: resolve,
			  fail: function () {
				  app.utils.showToast('图片资源获取失败, 请返回上一页重新拉取资源');
			  }
		  })
	  })
	},
	/*
	 * Description: 循环拉取微信服务端数据
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	getImageInfo() {
	 	let promiseArr = []
		this.data.resultData.map((itm) => {
			promiseArr.push(this.getImagePromiseArr(itm))
		})
		return promiseArr
	},

	/*
	 * Description: 单个图片下载处理
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/12
	 */
	getImageInfoBg(){
		let that = this;
		return new Promise((resolve => {
			wx.getImageInfo({
				src: that.data.resultBg, // 服务器返回的带参数的小程序码地址
				success: function (res) {
					that.data.resultBg = res.path
					resolve(true)
				},
				fail: function () {
					app.utils.showToast('图片资源获取失败, 请返回上一页重新拉取资源');
				}
			})
		}))
	},
	/*
	 * Description: 数组对象进行有小到大排序
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/7
	 */
	sortNumber(property) {
		return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value1 - value2;
		}
	},
	/*
	 * Description: 保存相册
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	canvasSave() {
		let that = this;
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.writePhotosAlbum']) {
					wx.authorize({
						scope: 'scope.writePhotosAlbum',
						success() { // 第一次 直接授权保存
							that.subSave()
							that.saveImageToPhotosAlbum();
						},
						fail() {
							that.setData({
								saveImgBtnHidden: false,
								openSettingBtnHidden: true
							})
						}
					})
				} else { // 拒绝授权之后 在授权执行保存
					that.subSave();
					that.saveImageToPhotosAlbum();
				}
			}
		})
	},
	/*
	 * Description: 提交保存数据
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/16
	 */
	subSave() {
		const openid = app.utils.getCache('openid');
		let data = {
			wxType: 2,
			openId: openid,
			pageName: '用户提交',
			bless: this.data.resultText,
			ids: app.utils.dishId(this.data.resultData)
		}
		app.http.$_post('clickNext', data).then(() => {});
	},
	/*
	 * Description: 保存到相册
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	saveImageToPhotosAlbum() {
		let that = this;
		wx.saveImageToPhotosAlbum({
			filePath: that.data.canvasBg,
			success() {
				wx.showToast({
					title: '保存成功'
				})
			},
			fail() {
				app.utils.showToast('保存失败')
			}
		})
	},
	/*
	 * Description: 生产图片路径  显示在页面
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	drawPicture() {
		let that = this;
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: 375,
			height: 500,
			fileType: 'jpg',
			canvasId: 'canvasId',
			success(res) {
				that.setData({
					canvasBg: res.tempFilePath
				})
			}
		})
	},
	/*
	 * Description: 相册二次授权
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	handleSetting(e) {
		if (!e.detail.authSetting['scope.writePhotosAlbum']) {
			wx.showModal({
				title: '警告',
				content: '若不打开授权，则无法将图片保存在相册中！',
				showCancel: false
			})
			this.setData({
				saveImgBtnHidden: false,
				openSettingBtnHidden: true
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '您已授权，赶紧将图片保存在相册中吧！',
				showCancel: false
			})
			this.setData({
				saveImgBtnHidden: true,
				openSettingBtnHidden: false
			})
		}
	},
	/*
	 * Description: 开放能力 跳转
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/15
	 */
	viewOpen() {
		app.utils.navigateTo('../webView/webView')
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options){
	  let that = this;
	  let shareObj = {
		  title: "拼桌菜", // 默认是小程序的名称
		  path: '/pages/index/index',  // 默认是当前页面，必须是以‘/’开头的完整路径
		  imageUrl: '',  //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		  success (res) {// 转发成功之后的回调
			  if (res.errMsg == 'shareAppMessage:ok') {}
		  },
		  fail () {// 转发失败之后的回调
			  if (res.errMsg == 'shareAppMessage:fail cancel') {// 用户取消转发
			  }else if (res.errMsg == 'shareAppMessage:fail') {// 转发失败，其中 detail message 为详细失败信息
			  }
		  },
		  complete(){// 转发结束之后的回调（转发成不成功都会执行）
		  }
	  }
	  // 来自页面内的按钮的转发
	  if (options.from == 'button') {
		  // var dataid = options.target.dataset; //data-id=shareBtn
	  }
	  return shareObj;
  },
})