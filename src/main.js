import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  render: h => h(App),
}).$mount('#app')
