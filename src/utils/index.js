export const getRedirectTo = (type, phone) => {
	let path = '';
	console.log(type);
	console.log(phone);
	if (!phone) {
		return 'register-index'
	}
	if (type === 'doctor') {
		path = 'doctor'
	} else {
		path = 'patient'
	}

	path += '-index';

	console.log(path);
	return path
};
