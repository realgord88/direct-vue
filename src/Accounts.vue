<template>
  <div>
    <vue-modaltor  :visible="open_status" @hide="hideModal">
      <p>Аккаунт успешно сменен</p>
    </vue-modaltor>

    <div class="ava-wrapper" v-for="account in info">
      <div class="smallstory">
        <div class="smallstory-wrapper">
          <img href="changeaccount(account[0])" :src="account[1]" alt="">
        </div>
      </div>
      <p>
        <button @click="changeaccount(account[0])" class="button-top">{{ account[0]}}</button>
      </p>
    </div>
  </div>
</template>



<script>
  import axios from 'axios';
  import Vue from 'vue'
  import VueModalTor from 'vue-modaltor'
  Vue.use(VueModalTor)
  
  export const HTTP = axios.create({
    baseURL: 'http://127.0.0.1:9000/'
  })
  
  export default {
    name: 'accounts',
    data() {
      return {
        open_status: false,
        info: null,
        changestatus: null
      };
    },
    mounted() {
      return HTTP.get('accounts/').then(response => (this.info = response.data.data))
    },
    methods: {
      hideModal() {
              this.open_status = false
      },
      changeaccount: function(account) {
        var bodyFormData = new FormData();
        bodyFormData.set('public', account);
        HTTP.post('changeaccount/', bodyFormData, {
            headers: {
              'Content-Type': 'application/vnd.api+json'
            }
          })
          .then(response => (this.changestatus = response.data.data.status));
          this.open_status = true;

      }
    }
  }
</script>