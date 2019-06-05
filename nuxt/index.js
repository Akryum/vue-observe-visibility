const { resolve } = require('path')

module.exports = function nuxtVueObserveVisibility() {
	this.addPlugin({
		ssr: false,
		src: resolve(__dirname, 'plugin.js'),
		fileName: 'vue-observe-visibility.js'
	})
}

module.exports.meta = require('../package.json')
