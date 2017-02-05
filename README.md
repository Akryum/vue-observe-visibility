# vue-observe-visibility

[![npm](https://img.shields.io/npm/v/vue-observe-visibility.svg) ![npm](https://img.shields.io/npm/dm/vue-observe-visibility.svg)](https://www.npmjs.com/package/vue-observe-visibility)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Detect when an element is becoming visible or hidden on the page.

[Demo](https://jsfiddle.net/Akryum/ppt7endj/)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save vue-observe-visibility
```

**⚠️ This plugin uses the [Intersection Observer API](https://github.com/WICG/IntersectionObserver) that is not currently supported in every browser (Chrome does though). You need to include a [polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill) to make it work on the incompatible browsers.**

## Default import

```javascript
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)
```

Or:

```javascript
import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)
```

## Distribution import

```javascript
import VueObserveVisibility from 'vue-observe-visibility/dist/vue-observe-visibility'

Vue.use(VueObserveVisibility)
```

 Or:

```javascript
import { ObserveVisibility } from 'vue-observe-visibility/dist/vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)
```

## Browser

```html
<script src="vue.js"></script>
<script src="vue-observe-visibility/dist/vue-observe-visibility.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the directives:

```javascript
Vue.use(VueObserveVisibility)
```

Use specific directives:

```javascript
Vue.directive('observe-visibility', VueObserveVisibility.ObserveVisibility)
```

## Source import

Install all the directives:

```javascript
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility/src'

Vue.use(VueObserveVisibility)
```

Use specific directives:

```javascript
import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility/src'

Vue.directive('observe-visibility', ObserveVisibility)
```

# Usage

The `v-observe-visibility` directive is very easy to use: just pass a function as the value, which will be called whenever the visiblity of the element changes with the argument being a boolean (`true` means the element is visible on the page, `false` means that it is not).

The second argument is the corresponding [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object.

# Example

```html
<div id="app">
  <button @click="show = !show">Toggle</button>
  <label>
    <input type="checkbox" v-model="isVisible" disabled/> Is visible?
  </label>
  <div ref="test" v-show="show" v-observe-visibility="visibilityChanged">Hello world!</div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    show: true,
    isVisible: true
  },
  methods: {
  	visibilityChanged: function (isVisible, entry) {
    	this.isVisible = isVisible
      console.log(entry)
    }
  }
})
</script>
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
