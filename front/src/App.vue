<template>
  <RouterView />
  <!-- 
    <router-view @userConnected="userConnected">
    </router-view> 
  -->
</template>

<script>
import { computed } from "vue";
  export default{
    data() {
      return {
        auth : false
      }
    },
    methods: {
      /*userConnected(payload){
        this.auth = payload.connected
      }*/
    },
    provide() {
      return {
        auth: computed(() =>  this.auth)
      }
    },  
    created() {
      console.log(localStorage.user);
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
