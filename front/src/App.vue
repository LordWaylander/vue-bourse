<template>
  <Header @searchIndiceBourse="searchIndiceBourse"/>
  <RouterView :query="query"/>
  <!-- 
    <router-view @userConnected="userConnected">
    </router-view> 
  -->
</template>

<script>
import { computed } from "vue";
import Header from '@/components/Header.vue';

  export default{
    components: {
        Header,
    },
    data() {
      return {
        auth : false,
        query : "msft"
      }
    },
    methods: {
      /*userConnected(payload){
        this.auth = payload.connected
      }*/
      searchIndiceBourse(payload) {
            this.query = payload.valueSearch;
        },
    },
    provide() {
      return {
        auth: computed(() =>  this.auth)
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
