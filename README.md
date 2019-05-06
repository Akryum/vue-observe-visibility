# vue-observe-visibility

[![npm](https://img.shields.io/npm/v/vue-observe-visibility.svg) ![npm](https://img.shields.io/npm/dm/vue-observe-visibility.svg)](https://www.npmjs.com/package/vue-observe-visibility)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Detect when an element is becoming visible or hidden on the page.

[Demo](https://jsfiddle.net/Akryum/ppt7endj/)


<p>
  <a href="https://www.patreon.com/akryum" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

### Gold

<p align="center">
  <a href="https://www.sumcumo.com/en/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/570728242399674380/logo-sumcumo.png" alt="sum.cumo logo" width="400px">
  </a>
</p>

### Silver

<p align="center">
  <a href="https://vueschool.io/" target="_blank">
    <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor.svg" alt="VueSchool logo" width="200px">
  </a>

  <a href="https://www.vuemastery.com/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267759130607630/Vue-Mastery-Big.png" alt="Vue Mastery logo" width="200px">
  </a>
</p>

### Bronze

<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/537832759985700914/537832771691872267/Horizontal_Logo_-_Dark.png" width="100">
  </a>

  <a href="https://www.frontenddeveloperlove.com/" target="_blank" title="Frontend Developer Love">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267744249085953/frontend_love-logo.png" width="56">
  </a>
</p>

<br>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save vue-observe-visibility
```

**⚠️ This plugin uses the [Intersection Observer API](http://caniuse.com/#feat=intersectionobserver) that is not supported in every browser (currently supported in Edge, Firefox and Chrome). You need to include a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) to make it work on incompatible browsers.**

## Import

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

## Browser

```html
<script src="vue.js"></script>
<script src="vue-observe-visibility/dist/vue-observe-visibility.min.js"></script>
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

# Usage

The `v-observe-visibility` directive is very easy to use. Just pass a function as the value:

```html
<div v-observe-visibility="visibilityChanged">
```

This also works on components:

```html
<MyComponent v-observe-visibility="visibilityChanged" />
```

The function will be called whenever the visiblity of the element changes with the argument being a boolean (`true` means the element is visible on the page, `false` means that it is not).

The second argument is the corresponding [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object.

```javascript
visibilityChanged (isVisible, entry) {
  this.isVisible = isVisible
  console.log(entry)
}
```

## IntersectionObserver options

It's possible to pass the [IntersectionObserver `options` object](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters) using the `intersection` attribute:

```html
<div v-observe-visibility="{
  callback: visibilityChanged,
  intersection: {
    root: ...,
    rootMargin: ...,
    threshold: 0.3,
  },
}">
```

## Once

It can be useful to listen for when the element is visible only once, for example to build introduction animations. Set the `once` option to `true`:

```html
<div v-observe-visibility="{
  callback: visibilityChanged,
  once: true,
}">
```

## Throttling visibility

You can use the `throttle` options (in ms) specifying minimal state duration after which an event will be fired. It's useful when you are tracking visibility while scrolling and don't want events from fastly scrolled out elements.

```html
<div v-observe-visibility="{
  callback: visibilityChanged,
  throttle: 300,
}">
```

## Passing custom arguments

You can add custom argument by using an intermediate function:

```html
<div v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, customArgument)">
```

Here `visibilityChanged` will be call with a third custom argument `customArgument`.

## Disabling the observer

Passing a falsy value to the directive will disable the observer:

```html
<div
  v-for="(item, index) of items"
  :key="item.id"
  v-observe-visibility="index === items.length - 1 ? visibilityChanged : false"
>
```

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
    isVisible: true,
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      console.log(entry)
    },
  },
})
</script>
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
