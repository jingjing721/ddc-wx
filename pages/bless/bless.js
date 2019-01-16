// pages/bless/bless.js
import * as utils from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  blessData: [],
	  bg: '',
    blessText: '',
    currentIndex: -1,
    blessList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.data.blessData = JSON.parse(options.deskData);
	  this.data.bg = options.bg;
		this.getBless();
  },
	/*
	 * Description: 获取祝福语
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/16
	 */
	getBless() {
		const openid = app.utils.getCache('openid');
		let data = {
			wxType: 2,
			openId: openid,
			pageName: '祝福语'
		}
		app.http.$_post('getBless', data).then((xhr) => {
			this.setData({
				blessList: xhr.data
			})
		})
	},
	bindBless(e) {
    this.setData({
	    blessText: e.detail.value,
      currentIndex: -1,
    })
  },
	bindList(e) {
    let index = e.currentTarget.dataset.index;
		this.setData({
			blessText: e.currentTarget.dataset.text,
      currentIndex: index
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