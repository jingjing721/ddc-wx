/*
 * Description: 对象转可拼接参数。 url: 跳转的URL；params: 对象形式的参数
 * Types：url -> String; params -> Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
export function navigateTo(url, params) {
	url += (url.indexOf("?") != -1) ? "" : "?";
	for(let i in params) {
		url += ((url.indexOf("=") != -1) ? "&" : "") + i + "=" + params[i];
	}
	wx.navigateTo({
		url
	})
}

/*
 * Description: showToast提醒。 title: 提醒的文字；timer: 可选设置时间
 * Types：title -> String; timer -> number
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
export function showToast(title, timer) {
	wx.showToast({
		title: title || '请添加提示',
		icon: 'none',
		duration: timer || 2000
	})
}

/*
 * Description: 深度拷贝。data: 拷贝的对象
 * Types：data -> Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
export function deepCopy(data) {
	if (typeof data === 'object') {
		return JSON.parse(JSON.stringify(data))
	}
}

/*
 * Description: 设置缓存 key: 设置key值; data: 设置value值
 * Types： key -> String, data -> String || Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/10
 */
export function setCache(key, data) {
	wx.setStorageSync(key, data);
}

/*
 * Description: 读取缓存 key: 读取key值
 * Types：key -> String
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/10
 */
export function getCache(key) {
	return wx.getStorageSync(key)
}

/*
 * Description: 数据整理获取菜品id. data: 菜品数据
 * Types： data -> Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/16
 */
export function dishId(data) {
	let resultArray = [];
	data && data.forEach((item) => {
		resultArray.push(item.id)
	})
	return resultArray.toString();
}

/*
 * Description: url 字符串
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/18
 */
export function getQueryString(url, name) {
		let urlArray = url.split('_');
		let tempObj = {}
		name.forEach((item, index) => {
			Object.assign(tempObj, {[item] : urlArray[index]})
		})
		return tempObj
}

/*
 * Description: 小程序基础库 2.5.0 -> 微信7.0.0版本
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/22
 */
export function getVersion() {
	let version = wx.getSystemInfoSync().SDKVersion.replace(/\./g, "");
	console.log(getCache('versionFlag'))
	if (parseInt(version) < 250 && getCache('versionFlag') != true) {
		wx.showModal({
			title: '小贴士',
			content: '系统检测到您的微信版本过低，为了不影响体验，请尽快升级到最新版本',
			showCancel: false,
			confirmText: '我知道啦',
			success(res) {
				setCache('versionFlag', true);
			}
		})
	}
}
export default {
	navigateTo,
	showToast,
	deepCopy,
	setCache,
	getCache,
	dishId,
	getQueryString,
	getVersion,
}