import axios from 'axios'

export default function ajax(url, data = {}, type = "POST") {
	return new Promise((resolve, reject) => {
		let promise;
		if (type === 'GET') {
			promise = axios.get(url, {params: data})
		} else {
			promise = axios.post(url, data)
		}

		promise.then(
			response => {
				resolve(response.data)
			},
			error => {
				reject(error)
			}
		)

	})
}


// return new Promise((resolve, reject) => {
// 	let promise;
// 	if (type === 'GET') {
// 		let dataStr = '';
// 		Object.keys(data).forEach(key => {
// 			dataStr += key + '=' + data[key] + '&'
// 		});
// 		if (dataStr !== '') {
// 			dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
// 			url = url + '?' + dataStr
// 		}
// 		promise = axios.get(url)
// 	} else {
// 		promise = axios.post(url, data)
// 	}
// 	promise.then(response => {
// 		resolve(response.data)
// 	}).catch(error => {
// 		reject(error)
// 	})
// })
// }
