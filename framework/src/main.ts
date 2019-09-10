import Vue from 'vue';
import Framework from './Framework.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Framework),
}).$mount('#app');
