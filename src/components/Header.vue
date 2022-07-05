<template lang="">
    <div className='header'>
      
        <ul>
          <RouterLink to="/" active-class="nav-active">
            <li>API</li>
          </RouterLink>
          <RouterLink to="/tableur" active-class="nav-active">
            <li>Tableur</li>
          </RouterLink>
        </ul>
      
      <form v-on:submit.prevent="submit($event)">
        <div>
          <input type="text" placeholder="Rechercher une valeur"  />
          <input type="submit" value="Rechercher" />
        </div>
      </form>
    </div>
</template>

<script>
export default {
  methods: {
    submit(e) {
      // envoie une "props" de l'enfant au parent, en l'occurence ici la recherche du header au parent pour faire la requete
      this.$emit('sendSearchToParent', { valueSearch: e.target[0].value })
    },
    sendSearch(value) {
      
    }
  },
}
</script>

<style lang="scss">
.header {
    background-color: rgb(255, 131, 0);
    padding: 1rem;
    border-radius: 0 0 2rem 2rem;
    display: grid;
    grid-template-columns: 30% 1fr 30%;
    grid-template-rows: 1;
    grid-template-areas: 'btn form .';

    ul {
      grid-area: btn;
      display: flex;
      align-items: center;
      //justify-content: space-around;
      padding: 0;
      list-style: none;

      a {
        background-color: #0051ff;
        width: 125px;
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
      a.nav-active {
          background-color: #083cac;
        }
    }
     

    form {
      grid-area: form;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas: '.' 'div' '.';
      div {
        grid-area: div;
        text-align: center;
      }
    }
}
</style>