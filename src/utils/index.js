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
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};


export const contactObject = function (target, sources) {
	Object.entries(sources).forEach(([sou_name, sou_value]) => {
		Object.entries(target).forEach(([tar_name, tar_value]) => {
			if (tar_name === sou_name) {
				sou_value = [...tar_value, ...sou_value];
			}
			Object.assign(sources, {[sou_name]: sou_value})
		})
	});
	return sources;
};

