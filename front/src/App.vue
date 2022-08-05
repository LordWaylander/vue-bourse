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
      /**
       * mettre en place un check régulier du token
       * export date exp ds data et watch sur heure actuelle ?
       */
      console.log(document);

      let token = localStorage.getItem('token');
      if (!!token){
        console.log('passe');
        API.post('/verifToken', {token})
        .then(res => {
          this.auth = res.data.auth
          if(res.data.auth == false) {
            localStorage.removeItem('token');
          }
        })
        .catch(err => {
          console.log(err);
        })
      }

    },
  }
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
</style>
