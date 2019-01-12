//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    viewData: [{
		    title: '肉类',
		    classID: 2,
		    content: [
		    	{
            src: 'https://mcn-video.daydaycook.com.cn/d4759738f014494cb6251d6f1c044bb8.png',
            id: 1,
		      },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/ae5f074b57094d62b42f445887e8caf3.png',
				    id: 2,
			    },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/68e366d9c85044c3b2f640bed5a62345.png',
				    id: 3,
          },
			    {
            src: 'https://mcn-video.daydaycook.com.cn/d4759738f014494cb6251d6f1c044bb8.png',
            id: 4,
          },
          {
            src: 'https://mcn-video.daydaycook.com.cn/ae5f074b57094d62b42f445887e8caf3.png',
            id: 5,
          },
          {
            src: 'https://mcn-video.daydaycook.com.cn/68e366d9c85044c3b2f640bed5a62345.png',
            id: 6,
          },
          {
            src: 'https://mcn-video.daydaycook.com.cn/d4759738f014494cb6251d6f1c044bb8.png',
            id: 7,
          },
          {
            src: 'https://mcn-video.daydaycook.com.cn/68e366d9c85044c3b2f640bed5a62345.png',
            id: 8,
          },
          {
            src: 'https://mcn-video.daydaycook.com.cn/ae5f074b57094d62b42f445887e8caf3.png',
            id: 9,
          },
          {
            src: '../../images/3.jpg',
            id: 10,
          },
          {
            src: '../../images/2.jpg',
            id: 11,
          },
          {
            src: '../../images/1.jpg',
            id: 12,
          },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/68e366d9c85044c3b2f640bed5a62345.png',
				    id: 6,
			    },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/d4759738f014494cb6251d6f1c044bb8.png',
				    id: 7,
			    },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/68e366d9c85044c3b2f640bed5a62345.png',
				    id: 8,
			    },
			    {
				    src: 'https://mcn-video.daydaycook.com.cn/ae5f074b57094d62b42f445887e8caf3.png',
				    id: 9,
			    }]
	    },
	    {
		    title: '水产',
		    classID: 3,
		    content: [{
            src: '../../images/1.jpg',
            id: 1
          },
			    {
				    src: '../../images/3.jpg',
				    id: 2
			    },
			    {
				    src: '../../images/2.jpg',
				    id: 3
			    }]
	    },
	    {
		    title: '肉禽品蛋',
		    classID: 3,
		    content: [{
			    src: '../../images/1.jpg',
			    id: 1
		    }]
	    },
	    {
		    title: '海鲜水产',
		    classID: 3,
		    content: [{
			    src: '../../images/1.jpg',
			    id: 1
		    }]
	    },
	    {
		    title: '蔬菜水果',
		    classID: 3,
		    content: [{
			    src: '../../images/1.jpg',
			    id: 1
		    }]
	    },
	    {
		    title: '主食甜品',
		    classID: 3,
		    content: [{
			    src: '../../images/1.jpg',
			    id: 1
		    }]
	    },


	    {
		    title: '主食甜品',
		    classID: 3,
		    content: [{
			    src: '../../images/1.jpg',
			    id: 1
		    }]
	    }
    ],
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
  	this.data.viewData.unshift(app.dict.bg)
    this.setData({
      listData: this.data.viewData[0].content,
	    bgUrl: this.data.viewData[0].content[0].src,
	    viewData: this.data.viewData
    })
  },
	/*
	 * Description:  添加菜品
	 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
	 * Date: 2019/1/5
	 */
	bindAdd(e) {
		if (e.currentTarget.dataset.cid == 1) {
			this.setData({
				bgUrl: this.data.listData[e.currentTarget.dataset.index].src
			})
			return false
		}
    let src = this.data.listData[e.currentTarget.dataset.index];
        src.x = 150;
        src.y = 150;
        src.zindex = this.data.maxZnum++
        this.setData({
          scaleSrc: app.utils.deepCopy(this.data.scaleSrc.concat(src))
        })
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
      listData: this.data.viewData[e.currentTarget.dataset.index].content
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
