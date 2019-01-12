// pages/result.js
import util from "../../utils/util";

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
	  close: '../../images/close.svg',
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
		let userInfo = app.utils.getCache('userInfo');
		console.log(windowWidth);
		const ctx = wx.createCanvasContext('canvasId');
		ctx.drawImage(this.data.resultBg, this.remSize(16), this.remSize(30), this.remSize(310), 300) // 绘制背景图
		ctx.drawImage(this.data.logo, this.remSize(80), this.remSize(8), this.remSize(18), this.remSize(18)) // 绘制logo
		ctx.drawImage(this.data.close, this.remSize(106), this.remSize(12), this.remSize(10), this.remSize(10)) // 绘制close
		ctx.setFontSize(14);
		ctx.setFillStyle("#000");
		ctx.fillText(`${userInfo.nickName}的新年餐桌`, this.remSize(128),this.remSize(22))
		this.data.resultData.sort(this.sortNumber('zindex')) // 排序之后绘制层级
		this.data.resultData.forEach((item) => { // 绘制 手动添加的菜品
			ctx.drawImage(item.src, item.x, item.y, this.remSize(100), this.remSize(100));
    })
		ctx.fillText(this.data.resultText, 50, 280)
		// ctx.drawImage(this.data.code, 0, 0, 120, 120) // 绘制背景
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