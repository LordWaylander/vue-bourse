<template lang="">
    <div className='header'>
        <div>
          <RouterLink to="/" active-class="nav-active">
            <button>API</button>
          </RouterLink>
          <RouterLink to="/tableur" active-class="nav-active">
            <button>Tableur</button>
          </RouterLink>
          
        </div>
      
      <form @submit.prevent="submit()">
        <div>
          <input id="search" type="text" placeholder="Rechercher une valeur"  v-model="searchIndice"/>
          <input id="submit" type="submit" value="Rechercher" />
        </div>
      </form>

      <div id="connexion">
          <RouterLink to="/connexion" active-class="nav-active">
            <button>Connexion</button>
          </RouterLink>
      </div>
      
    </div>
</template>

<script>
export default {
  data(){
    return{
      searchIndice:''
    }
  },
  methods: {
    submit() {
      // envoie une "props" de l'enfant au parent, en l'occurence ici la recherche du header au parent pour faire la requete
      this.$emit('searchIndiceBourse', { valueSearch: this.searchIndice })
    }
  }
}
</script>

<style lang="scss">
.header {
    background-color: rgb(255, 131, 0);
    border-radius: 0 0 2rem 2rem;
    display: grid;
    grid-template-columns: 30% 1fr 30%;
    grid-template-areas: 'btn form connexion';

    div {
      grid-area: btn;
      display: flex;
      align-items: center;
      padding: 0;
      list-style: none;
      a {
        background-color: #0051ff;
        width: 8rem;
        border: 2px solid #08f;
        border-radius: 50px;
        text-decoration: none;
        color: white;
        padding: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        &:hover {
          background-color: rgb(0, 110, 255);
        }
      }
      a button{
        border: none;
        background:none;
        color: white;
      }
      a.nav-active {
          background-color: #083cac;
      }
    }
     

    form {
      grid-area: form;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-areas: '.' 'div' 'div' '.';

      div {
        grid-area: div;
        display: grid;
        grid-template-columns: 1fr 20% 20% 1fr;
        grid-template-rows: 1fr 1fr;

        #search{
          grid-column-start: 1;
          grid-column-end: 5;
          height: 25px;
          border-radius: 10px;
        }
        #submit{
          grid-column-start: 2;
          grid-column-end: 4;
          height: 25px;
          background-color: #0051ff;
          border: 2px solid #08f;
          border-radius: 0 0 10px 10px;
          color: white;
          font-weight: bold;
          &:hover {
          background-color: #083cac;
          }
        }
      }
    }

    #connexion{
      grid-area: connexion;
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>