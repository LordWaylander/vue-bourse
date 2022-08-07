<template>
  <Header 
    @searchIndiceBourse="searchIndiceBourse"
    @userConnected="userConnected" 
    :auth="auth" >
  </Header>
  
  <RouterView 
    @userConnected="userConnected"  
    @emptyRequestSearch="emptyRequestSearch"
    :querySearchIndice="querySearchIndice" >
  </RouterView>
</template>

<script>
import Header from '@/components/Header.vue';
import API from '@/_services/api.service.js';
import VueCookies from 'vue-cookies'
/**
 * Trouver le moyen de passer @searchIndiceBourse (header) à Home sans passer par app 
 * @searchIndiceBourse (emit) -> :querySearchIndice (props)
 * 
 * Même chose pour emptyRequestSearch soit tout décaler ds Home, soit un transfert de Modal à App
 * "relié a au dessus"
 */

  export default{
    
    components: {
      Header
    },
    data() {
      return {
        auth : false,
        querySearchIndice : "",
        dateNow : ''
      }
    },
    methods: {
      userConnected(payload){
        this.auth = payload.connected
      },
      searchIndiceBourse(payload) {
        this.querySearchIndice = payload.valueSearch;
      },
      emptyRequestSearch(payload){
        this.querySearchIndice=payload
      }
    },
    created() {  
        API.post('/verifToken')
        .then(res => {
          this.auth = res.data.auth
          if(res.data.auth == false) {
            $cookies.remove('token')
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
</style>
