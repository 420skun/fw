import Vue from 'vue';
import Checknote from './Checknote.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Checknote),
}).$mount('#app');
