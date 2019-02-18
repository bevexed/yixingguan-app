const {
	override,
	fixBabelImports,
	addLessLoader,
} = require("customize-cra");


module.exports = override(
	fixBabelImports("antd-mobile",
		{
			libraryDirectory: "es", style: 'css' // change importing css to less
		}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: require('./package.json').theme
	})
);
