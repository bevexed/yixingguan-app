const {
	override,
	fixBabelImports,
	addLessLoader,
	addPostcssPlugins
} = require("customize-cra");


module.exports = override(
	fixBabelImports("antd-mobile",
		{
			libraryDirectory: "es", style: true // change importing css to less
		}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: require('./package.json').theme
	}),
	addPostcssPlugins([
		// require('postcss-px2rem')({ remUnit: 37.5 })
		require('postcss-pxtorem')({
			rootValue: 37.5,
			unitPrecision: 5,
			propList: ['width','height','font-size','background-size','padding','margin','bottom','top','padding'],
			selectorBlackList: ['am-','slider'],
			replace: true,
			mediaQuery: false,
			minPixelValue: 12,
			maxPixelValue: 470
		}),
	]),
);
