//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
      viewData: [],
	  scaleSrc: [],
	  maxZnum: 0,
	  bgUrl: '',
	  listData: [],
	  isActive: 0,
  },
	/*
	 * Description: 初始化第一分类数据
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
  onLoad: function () {
  	
	let self = this;
  	const openid = app.utils.getCache('openid');
    app.http.$_post('getCookBook',{
        wxType: '2',
        openId: openid,
        pageName: '菜谱',
	}).then(function (res) {
		if(res && res.code == '0000'){
			let viewDataList = self.data.viewData;
           res.data.map(function (item, index) {
               viewDataList.push(item);
           });
           self.setData({
			   viewData: viewDataList,
			   listData: viewDataList[0].dishes,
               bgUrl: viewDataList[0].dishes[0].foodImg,
		   })
        }else if(res && res.code == '2000'){
            wx.showToast({
                title: '未查到记录',
                icon: 'none',
                duration: 2000
            })
		}else{
            wx.showToast({
                title: '服务器错误',
                icon: 'none',
                duration: 2000
            })
		}
    }).catch(function (err) {
        wx.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 2000
        })
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
		app.utils.navigateTo('../bless/bless', {
			deskData: JSON.stringify(this.data.scaleSrc),
			bg: this.data.bgUrl
		})
	}
})
