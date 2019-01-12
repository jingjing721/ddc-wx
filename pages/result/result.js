// pages/result.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
	  resultData: [],
    resultBg: '',
	  resultText: '',
	  logo: '../../images/logo.png',
	  code: 'http://pic.qqtn.com/up/2018-1/2018012710125472621.jpg',
	  resultArray: [],
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
		let windowWidth = wx.getSystemInfoSync().windowWidth;
		const ctx = wx.createCanvasContext('canvasId');
		ctx.drawImage(this.data.resultBg, 0, 50, windowWidth, 200) // 绘制背景
		this.data.resultData.sort(this.sortNumber('zindex')) // 排序之后绘制层级
		this.data.resultData.forEach((item) => { // 绘制 手动添加的菜品
			ctx.drawImage(item.src, item.x, item.y, this.remSize(100), this.remSize(100));
    })
		ctx.drawImage(this.data.logo, 0, 0, this.remSize(120), this.remSize(120)) // 绘制背景
		ctx.setFontSize(18)
		ctx.fillText('Accardo的新年餐桌', 30 , 20)
		ctx.fillText(this.data.resultText, 50, 280)
		ctx.drawImage(this.data.code, 0, 0, 120, 120) // 绘制背景
		ctx.draw();

		this.data.resultData.forEach((item) => {
			 this.data.resultArray.push(item.id)
		})

		console.log(this.data.resultArray.toString(), 'ctx');
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
	 * Description: 按照375大小转换px 计算不同屏幕设备大小转换
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/7
	 */
	remSize (num) {
		let scale = wx.getSystemInfoSync().windowWidth / 375
		return num * scale
	},
	bindSave() {
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: wx.getSystemInfoSync().windowWidth,
			height: 300,
			fileType: 'jpg',
			canvasId: 'canvasId',
			success(res) {
				console.log(res.tempFilePath)
			}
		})
	},
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
  onShareAppMessage () {

  }
})