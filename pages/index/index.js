// pages/index/index.js
import * as http from '../../utils/http.js'
import * as utils from '../../utils/util.js'
const app = getApp();
      app.http = http
      app.utils = utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	uid: '',
  },
	/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu();
		let scene = decodeURIComponent(options.scene);
		let uid = '';
		if (scene) {
			uid = app.utils.getQueryString(scene, ['uid']).uid;
		} else {
			uid = options.uid
		}
  	if (options.uid || scene) {
  		this.data.uid = uid
	  }
  },
	/*
	 * Description: 授权获取用户信息
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/9
	 */
	bindNext(e) {
	  const openid = app.utils.getCache('openid');
    if (openid && e.detail.userInfo) {
	  	let userInfo = e.detail.userInfo
	  	let data = {
			  pageName: '扫码入口',
			  nickName: userInfo.nickName,
			  gender: userInfo.gender,
			  language: userInfo.language,
			  city: userInfo.city,
			  province: userInfo.province,
			  province: userInfo.province,
			  avatarUrl: userInfo.avatarUrl,
			  otherOpenId: this.data.uid
		  }
		  console.log(data, 'orderUid');
	    app.http.$_post('putUserInfo', data).then((xhr) => {
			    app.utils.setCache('uid', xhr.data.uid);
			    app.utils.setCache('qrCode', xhr.data.qrCode);
	    })
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