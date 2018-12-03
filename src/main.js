import Vue from 'vue'
import Rival from './Rival.vue'
import Accounts from './Accounts.vue'
import VModal from 'vue-js-modal'



new Vue({
  el: '#rival',
  render: h => h(Rival),
})
Vue.use(VModal)


new Vue(
{
  el: '#accounts',
  render: h => h(Accounts)
})

