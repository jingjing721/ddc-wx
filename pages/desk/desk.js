//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	viewData: [], // 菜品分类
	  scaleSrc: [], // 选中菜品
	  maxZnum: 0,
	  bgUrl: '',
	  listData: [], // 单个菜品数组
	  isActive: 0,
  },
	/*
	 * Description: 初始化第一分类数据
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
  onLoad: function () {
  	this.getDesk();
  },
	/*
	 * Description: 获取菜品
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/16
	 */
	getDesk() {
		wx.showLoading({
			title: '数据加载中...',
		})
		const openid = app.utils.getCache('openid');
		let data = {
			wxType: '2',
			openId: openid,
			pageName: '菜谱'
		}
		app.http.$_post('getCookBook', data).then((xhr) => {
			this.setData({
				viewData: xhr.data,
				listData: xhr.data[0].dishes,
				bgUrl: xhr.data[0].dishes[0].foodImg
			})
			wx.hideLoading();
		});
	},
	/*
	 * Description:  添加菜品
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindAdd(e) {
		if (e.currentTarget.dataset.cid == 'canzhuobeijing') {
			this.setData({
				bgUrl: this.data.listData[e.currentTarget.dataset.index].foodImg
			})
			return false
		}
    	let src = this.data.listData[e.currentTarget.dataset.index];
        src.x = 150 + this.rnd(0, 20);
        src.y = 150 + this.rnd(10, 30);
        src.zindex = this.data.maxZnum++
        this.setData({
          scaleSrc: app.utils.deepCopy(this.data.scaleSrc.concat(src))
        })
 	 },
	/*
	 * Description: 随机一个范围
	 * Types：n -> number; m -> number
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/14
	 */
	rnd(n, m){
		let random = Math.floor(Math.random()*(m-n+1)+n);
		return random;
	},
	/*
	 * Description: 层级控制
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindZindex(e) {
		this.data.scaleSrc[e.currentTarget.dataset.index].zindex = this.data.maxZnum ++
		this.setData({
				scaleSrc: this.data.scaleSrc,
		})
	  },
	/*
	 * Description: 删除菜品
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindClose(e) {
		this.data.scaleSrc.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			scaleSrc: app.utils.deepCopy(this.data.scaleSrc),
		})
 	 },
	/*
	 * Description: 记录移动位置 X轴、Y轴
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/4
	 */
	onChange(e) {
     if (e.detail.source === "touch") {
		    this.data.scaleSrc[e.currentTarget.dataset.index].x = e.detail.x
		    this.data.scaleSrc[e.currentTarget.dataset.index].y = e.detail.y
			this.setData({
			  scaleSrc: this.data.scaleSrc
			})
		 }
	  },
	/*
	 * Description: 显示分类数据
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindClass(e) {
	  this.setData({
	  	isActive: e.currentTarget.dataset.index,
      	listData: this.data.viewData[e.currentTarget.dataset.index].dishes,
    	})
  	},
	/*
	 * Description: 下一步
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindNext() {
		if (this.data.scaleSrc.length <= 0) {
			app.utils.showToast('必须添加一个菜品');
			return false
		}
		this.subSave();
		app.utils.navigateTo('../bless/bless', {
			deskData: JSON.stringify(this.data.scaleSrc),
			bg: this.data.bgUrl
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
			pageName: '菜谱',
			ids: app.utils.dishId(this.data.scaleSrc)
		}
		app.http.$_post('clickNext', data).then(() => {});
	},
})
