function throwValueError (value) {
  if (typeof value !== 'function') {
    throw new Error('observer-visible directive expects a function as the value')
  }
}

export default {
  bind (el, { value }) {
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill')
    } else {
      throwValueError(value)
      el._vue_visibilityCallback = value
      const observer = el._vue_intersectionObserver = new IntersectionObserver(entries => {
        var entry = entries[0]
        el._vue_visibilityCallback(entry.intersectionRatio > 0)
      })
      observer.observe(el)
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
