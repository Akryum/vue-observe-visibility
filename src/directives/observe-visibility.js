function throwValueError (value) {
	if (value !== null && typeof value !== 'function') {
		throw new Error('observe-visibility directive expects a function as the value')
	}
}

export default {
	bind (el, { value }, vnode) {
		if (typeof IntersectionObserver === 'undefined') {
			console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill')
		} else {
			throwValueError(value)
			el._vue_visibilityCallback = value
			const observer = el._vue_intersectionObserver = new IntersectionObserver(entries => {
				var entry = entries[0]
				if (el._vue_visibilityCallback) {
					// Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
					el._vue_visibilityCallback.call(null, entry.isIntersecting || entry.intersectionRatio > 0, entry)
				}
			})
			// Wait for the element to be in document
			vnode.context.$nextTick(() => {
				observer.observe(el)
			})
		}
	},
	update (el, { value }) {
		throwValueError(value)
		el._vue_visibilityCallback = value
	},
	unbind (el) {
		if (el._vue_intersectionObserver) {
			el._vue_intersectionObserver.disconnect()
			delete el._vue_intersectionObserver
			delete el._vue_visibilityCallback
		}
	},
}
