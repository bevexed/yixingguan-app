import EXIF from '../static/exif'

// 生成重定向路径
export const getRedirectTo = (type) => {
	let path = '';

	if (type === 'doctor') {
		path = 'doctor'
	} else {
		path = 'patient'
	}

	path += '-index';

	if (sessionStorage.path) {
		return sessionStorage.path
	}

	return path
};


/**
 * @return {null}
 */
export const GetQueryString = function (name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let url = decodeURIComponent(window.location.search);
	console.log(url);
	let r = url.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};

// 合并带有数组的对象
export const contactObject = function (target, sources) {
	if (!Object.keys(target).length) {
		return sources
	}

	Object.entries(sources).forEach(([sou_name, sou_value]) => {
		Object.entries(target).forEach(([tar_name, tar_value]) => {
			if (tar_name === sou_name) {
				Array.isArray(sou_value) && JSON.stringify(tar_value) !== JSON.stringify(sou_value) && (sou_value = [...tar_value, ...sou_value]);
			}
			Object.assign(target, {[sou_name]: sou_value});
		})
	});

	return target;
};

// 函数防抖
export const debounce = function (method, delay) {
	let timer = null;
	return () => {
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			method()
		}, delay);
	}
};

export const rotates = (e) => {
	console.log(e.target);
	console.log(e.target.file);
	EXIF.getData(e.target.file, function () {
		let Orientation = EXIF.getAllTags(this).Orientation;
		console.log(Orientation);
		if (Orientation === 6) {
			this.rotate = 90
		} else {
			this.rotate = 0
		}
	})
};
