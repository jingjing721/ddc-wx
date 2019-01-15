// pages/index/index.js
import * as http from '../../utils/http.js'
import * as utils from '../../utils/util.js'
import * as dict from '../../utils/dict.js'
const app = getApp();
      app.http = http
      app.utils = utils
			app.dict = dict
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
	/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
	/*
	 * Description: 授权获取用户信息
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/9
	 */
	bindNext(e) {
		console.log(e, '点击授权')
	  const openid = app.utils.getCache('openid');
	  if (!openid) {
	    app.utils.showToast('openid 不存在');
	    return false
    }
    if (e.detail.userInfo) {
	    app.utils.setCache('userInfo', e.detail.userInfo);
	    app.utils.navigateTo('../desk/desk');
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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