const IPHOST = 'https://mcn-app-d.daydaycook.com.cn'; // 域名地址
const SYSTEM = 'program'; // 路径中系统
const VERSION = 'v1.0.0' // 当前接口版本
/*
 * Description: POST 请求
 * Types：url -> String; data -> Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
export function $_post(url, data) {
	return httpPromise(url, data, 'POST');
}

/*
 * Description: GET 请求
 * Types：url -> String; data -> Object
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
export function $_get(url, data) {
	return httpPromise(url, data, 'GET');
}

/*
 * Description: http请求
 * Types： url -> String; data -> Object; method -> String
 * Author: yanlichen <lichen.yan@daydaycook.com.cn>
 * Date: 2019/1/8
 */
function httpPromise(url, data, method) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: `${IPHOST}/mcn/${SYSTEM}/${VERSION}/${url}`,
			data,
			method,
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				if (res.statusCode == 200) {
					if (res.data.code === '0000') { // 数据 0000 成功返回
						resolve(res.data);
					} else {
						resolve(res.message)
					}
				} else {
					reject(res.data);
				}
			},
			fail: function () {
				reject('网络出错');
			}
		})
	})
}
export default {
	$_post,
	$_get
}