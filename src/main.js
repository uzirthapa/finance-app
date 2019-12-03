import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import VueAppleSignin from 'vue-apple-signin';

Vue.use(VueAppleSignin, {
  clientId: 'CLIENT_ID',
  scope: 'SCOPE',
  redirectURI: 'REDIRECT_URI',
  state: 'STATE',
});

Vue.config.productionTip = false
Vue.use(Donut);

export const bus = new Vue();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')



