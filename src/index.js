import ObserveVisibility from './directives/observe-visibility'

// Install the components
export function install (Vue) {
	Vue.directive('observe-visibility', ObserveVisibility)
	/* -- Add more components here -- */
}

export {
	ObserveVisibility,
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
	// eslint-disable-next-line no-undef
	version: VERSION,
	install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}
