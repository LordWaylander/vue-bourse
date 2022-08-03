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
        querySearchIndice : "",
        dateNow : ''
      }
    },
    methods: {
      userConnected(payload){
        this.auth = payload.connected
        if(this.auth === true){
          // si authentifier lancement fonction validité token
          this.date();
        }
      },
      searchIndiceBourse(payload) {
        this.querySearchIndice = payload.valueSearch;
      },
      queryValueConnected(payload) {
        this.query = payload.queryValueConnected
      },
      date() {
        // calcul de date pour vérification validité token
          setInterval(() => {
            if(this.auth === true){
              return this.dateNow =  Math.trunc(Date.now()/1000)
            }
            return;
          }, 1000);
        
      }
    },
    created() {
      /**
       * mettre en place un check régulier du token
       * export date exp ds data et watch sur heure actuelle ?
       */
      
      if (localStorage.token) {
        let dateNow = Math.trunc(Date.now()/1000);
        let decodedToken = jwtDecode.decode(localStorage.token);
        const expDate = decodedToken.exp

        if(dateNow > expDate) {
          localStorage.removeItem('token');
          return this.auth = false
        }
        this.date()
        return this.auth = true
        
      }
    },
    watch:{
      'dateNow'(){
        /**
         * déconnexion si token expiré
         * mettre un avertissement ?
         */
        let decodedToken = jwtDecode.decode(localStorage.token);
        const expDate = decodedToken.exp
        if(this.dateNow > expDate) {
          localStorage.removeItem('token');
          return this.auth = false
        }
      }
    }
  }
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
</style>
