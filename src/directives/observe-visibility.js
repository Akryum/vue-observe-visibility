function throwValueError (value) {
	if (value !== null && typeof value !== 'function') {
		throw new Error('observe-visibility directive expects a function as the value')
	}
}

function makeEmitter (delayRaw) {
	let delayAmmount = 0
	if ((delayRaw || '').match(/\d+ms/)) {
		delayAmmount = Number(delayRaw.match(/(\d+)ms/)[1])
	}
	if (delayAmmount === 0) {
		return (state, elt, callback) => {
			if (callback) {
				callback.call(null, state, elt)
			}
		}
	} else {
		let timeout = null
		let lastState = null
		return (state, elt, callback) => {
			if (timeout) {
				if (state !== lastState) {
					clearTimeout(timeout)
				} else {
					return
				}
			}
			lastState = state
			timeout = setTimeout(() => {
				if (callback) {
					callback.call(null, state, elt)
				}
				timeout = null
			}, delayAmmount)
		}
	}
}

export default {
	bind (el, { value, arg }, vnode) {
		if (typeof IntersectionObserver === 'undefined') {
			console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill')
		} else {
			throwValueError(value)
			el._vue_visibilityCallback = value
	
			const emitter = makeEmitter(arg)
			const observer = el._vue_intersectionObserver = new IntersectionObserver(entries => {
				var entry = entries[0]
				emitter(entry.intersectionRatio > 0, entry, el._vue_visibilityCallback)
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
