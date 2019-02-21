export function getRedirectTo(type, phone) {
	let path = '';
	console.log(type);
	if (!phone) {
		return 'register-index'
	}
	if (type === 'doctor') {
		path = 'doctor'
	} else {
		path = 'patient'
	}

	path += '-index';

	return path
}
