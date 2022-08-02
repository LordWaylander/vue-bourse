<template>
  <Header 
    @searchIndiceBourse="searchIndiceBourse" 
    @userConnected="userConnected" 
    :auth="auth" >
<!--     -->
  </Header>
  
  <RouterView 
    @userConnected="userConnected" 
    @queryValueConnected="queryValueConnected" 
    :query="query" 
    :querySearchIndice="querySearchIndice" >
  </RouterView>
  
  
</template>

<script>
import { computed } from "vue";
import Header from '@/components/Header.vue';
import jwtDecode from 'vue-jwt-decode'

  export default{
    components: {
      Header
    },
    data() {
      return {
        auth : false,
        query : "msft",
        querySearchIndice : ""
      }
    },
    methods: {
      userConnected(payload){
        this.auth = payload.connected
      },
      searchIndiceBourse(payload) {
        this.querySearchIndice = payload.valueSearch;
      },
      queryValueConnected(payload) {
        this.query = payload.queryValueConnected
      }
    },
    created() {
      
      if (localStorage.token) {
        let dateNow = Math.trunc(Date.now()/1000);
        let decodedToken = jwtDecode.decode(localStorage.token);
        const expDate = decodedToken.exp

        if(dateNow > expDate) {
          localStorage.removeItem('token');
          return this.auth = false
        }

        return this.auth = true
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
