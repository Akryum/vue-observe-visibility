import { processOptions, throttle } from '../utils'

class VisibilityState {
	constructor (el, options, vnode) {
		this.el = el
		this.observer = null
		this.createObserver(options, vnode)
	}

	get threshold () {
		if (this.options.intersection && this.options.intersection.threshold) {
			return this.options.intersection.threshold;
		}
		return 0;
	}

	createObserver (options, vnode) {
		if (this.observer) {
			this.destroyObserver()
		}

		this.options = processOptions(options)

		this.callback = this.options.callback
		// Throttle
		if (this.callback && this.options.throttle) {
			this.callback = throttle(this.callback, this.options.throttle)
		}

		this.observer = new IntersectionObserver(entries => {
			var entry = entries[0]
			if (this.callback) {
				// Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
				this.callback(entry.isIntersecting && entry.intersectionRatio >= this.threshold, entry)
			}
		}, this.options.intersection)

		// Wait for the element to be in document
		vnode.context.$nextTick(() => {
			this.observer.observe(this.el)
		})
	}

	destroyObserver () {
		if (this.observer) {
			this.observer.disconnect()
		}

		// Cancel throttled call
		if (this.callback && this.callback._clear) {
			this.callback._clear()
		}
	}
}

export default {
	bind (el, { value }, vnode) {
		if (typeof IntersectionObserver === 'undefined') {
			console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill')
		} else {
			const state = new VisibilityState(el, value, vnode)
			el._vue_visibilityState = state
		}
	},

	update (el, { value }, vnode) {
		const state = el._vue_visibilityState
		if (state) {
			state.createObserver(value, vnode)
		} else {
			this.bind(el, { value }, vnode)
		}
	},

	unbind (el) {
		const state = el._vue_visibilityState
		if (state) {
			state.destroyObserver()
			delete el._vue_visibilityState
		}
	},
}
