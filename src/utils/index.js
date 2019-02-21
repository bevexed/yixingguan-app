export function getRedirectTo(type, header) {
	let path = '';
	console.log(type);
	if (type === 'doctor') {
		path = 'doctor'
	} else {
		path = 'patient'
	}

	path += '-index';

	// if (!header) {
	// 	path += '-info'
	// }

	// if (header) {
	// 	if (type === 'dashen') {
	// 		path = 'laoban'
	// 	} else {
	// 		path = 'dashen'
	// 	}
	// }

	return path
}
