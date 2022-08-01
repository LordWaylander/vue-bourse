<template>
  <Header @searchIndiceBourse="searchIndiceBourse" :auth="auth" />
  
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
      if (localStorage.user) {
        this.auth = true
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
