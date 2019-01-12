// pages/bless/bless.js
import * as utils from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  blessData: [],
	  bg: '',
    blessText: '',
    blessList: [
      '老子云：莫要装逼',
      '孔子云：不装逼咋行',
      '孟子云：装逼要挨揍',
      '墨子云：装逼带节奏',
      '老夫子云：装完逼就要跑'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.data.blessData = JSON.parse(options.deskData);
	  this.data.bg = options.bg;
  },
	bindBless(e) {
    this.setData({
	    blessText: e.detail.value
    })
  },
	bindList(e) {
		this.setData({
			blessText: e.currentTarget.dataset.text
		})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindNext() {
    if (this.data.blessText == '' || this.data.blessText == null) {
	    utils.showToast('请填写祝福语')
      return false
    }
    utils.navigateTo('../result/result', {
	    resultData: JSON.stringify(this.data.blessData),
	    bg: this.data.bg,
	    blessText: this.data.blessText
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})