import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const config = require('../package.json')

export default {
	input: 'src/index.js',
	name: 'vue-observe-visibility',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		cjs(),
		babel({
			exclude: 'node_modules/**',
			'plugins': [
				'external-helpers',
			],
		}),
		replace({
			VERSION: JSON.stringify(config.version),
		}),
	],
	watch: {
		include: 'src/**',
	},
}
