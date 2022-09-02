import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.api_server = "http://192.168.4.214:8000"
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
