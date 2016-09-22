import Vue from 'vue';

import { event } from './utils';
import { http } from './services';
/**
 * For Ancelot, the ancient cross of war
 * for the holy town of Gods
 * Gloria, gloria perpetua
 * in this dawn of victory
 */
// TODO might still need tweaking, see git diff -U10 a6501ae vue
new Vue({
  el: 'div#content',
  render: h => h(require('./app.vue')),
  created() {
    event.init();
    http.init();
  },
});
