// import '!style-loader!css-loader!./style.css';
//
// document.getElementById('app').innerHTML = 'Hello Webpack.';

import Vue from 'vue';
import App from './app.vue';
import jsPlumb from "jsplumb";
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb;

new Vue({
    el: '#app',
    render: h => h(App)
})