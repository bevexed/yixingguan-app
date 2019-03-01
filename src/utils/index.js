export const getRedirectTo = (type, phone) => {
	let path = '';
	if (!phone && !type){
		return 'register-index'
	}

	if (!phone) {
		return 'register-phone'
	}

	if (!type){
		return 'select-player'
	}

	if (type === 'doctor') {
		path = 'doctor'
	} else {
		path = 'patient'
	}

	path += '-index';

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
