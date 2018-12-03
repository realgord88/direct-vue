<template>
  <div>
    
    <vue-modaltor  :visible="open_dm" @hide="hideModal">
      <p>Ошибка отправки сообщения</p>
    </vue-modaltor>

    <div class="left-block">
      <form action="">
        <input type="text" ref="newpublic"/>
        <button @click="addpublicrival">
          <img src="img/checkmark.png" alt="">
        </button>
      </form>
      <hr>
      <div class="ava-wrapper" v-for="(nickname, index) in nicknames">
        <div class="smallstory">
          <div class="smallstory-wrapper">
          <img :src="nickname[1]" @click="getinforival(nickname[0])">
          </div>
        </div>
        <p>
          {{nickname[0]}}
        </p>
        <div class="delete">
          <img src="img/icons8-minus-50.png" @click="delpublicrival(nickname[0], index)" alt="">
        </div>
      </div>
    </div>

    <div class="right-block"  style="margin-bottom:15px;">
      <table>
        <tbody>
          <tr>
            <th>
              <img src="img/clock.png" alt="">Date
            </th>
            <th style="padding-right: 130px;">
              <img src="img/user.png" alt="">Nickname
            </th>
            <th>
              <img src="img/mail.png" alt="">Dialog
            </th>
            <th>
              <img src="img/user-group.png" alt="">Followers
            </th>
            <th style="border-right: 0px;">
              <img src="img/message.png" alt="">Message
            </th>
          </tr>
          <tr v-for="(girls, index_girls) in rival_info" v-if="girls['nickname_girl'] != 'error'">
            <td>
              {{girls['created_time']}}
            </td>
            <td>
              {{girls['nickname_girl']}}
            </td>
            <td style="text-align: center;">
              <img v-if="girls['dm_status'] === false" src="img/cross.png" alt="">
              <img v-else src="img/checkmark.png" alt="">
            </td>
            <td>
              {{girls['followers_girls']}}
            </td>
            <td style="border-right: 0;">
              <button @click="direct(girls['nickname_girl'], index_girls)">
                Отправить
              </button>
            </td>
          </tr>		
        </tbody>
      </table>
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
  name: 'rival',
  data () {
    return {
      open_dm: false,
      nicknames: [],
      rival_info: [],
      showModal: false,
      direct_status: ''
    };
  },
  mounted() {
    HTTP.get('publicsrival/').then(response => (this.nicknames = response.data.data));
  },
  methods: {
    hideModal() {
              this.open_dm = false
    },
    delpublicrival: function (nickname, index) {
      var bodyFormData = new FormData();
      bodyFormData.set('public', nickname);
      this.nicknames.splice(index, 1)
      HTTP.post('delpublicrival/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
      .then(response => (this.del_changestatus = response.data.data.status));   
    },
    addpublicrival: function () {
      this.output = this.$refs.newpublic.value;
      var bodyFormData = new FormData();
      bodyFormData.set('public', this.output);
      HTTP.post('getavatar/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
      .then(response => (this.profile_pic = response.data.data.status));
      HTTP.post('addpublicrival/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
      .then(response => (this.add_changestatus = response.data.data.status));
      this.nicknames.push([this.output, this.profile_pic]);
    },
    getinforival: function (nickname) {
      var bodyFormData = new FormData();
      bodyFormData.set('username', nickname);
      HTTP.post('publicinfo', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
      .then(response => (this.rival_info = response.data.data));      
    },
    direct: function (nickname, index_girls) {
      var bodyFormData = new FormData();
      bodyFormData.set('username', nickname);
      HTTP.post('direct', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
      .then(response => (this.direct_status = response.data.data.status));
      if (this.direct_status == 'error') {
        this.open_dm = true;
      }
      else{
        for (var i=0; i < this.rival_info.length; i++){
          if (this.rival_info[i]['nickname_girl'] == this.rival_info[index_girls]['nickname_girl']){
              this.rival_info[i]['dm_status'] = true;
          }
        }
      }   
    },
  }
}
</script>