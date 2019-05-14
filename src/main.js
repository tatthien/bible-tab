import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './components/Icons'
import './directives'

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')
