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
      
      <form @submit.prevent="submit($event)">
        <div>
          <input id="search" type="text" placeholder="Rechercher une valeur"  />
          <input id="submit" type="submit" value="Rechercher" />
        </div>
      </form>
    </div>
</template>

<script>
export default {
  methods: {
    submit(e) {
      // envoie une "props" de l'enfant au parent, en l'occurence ici la recherche du header au parent pour faire la requete
      this.$emit('searchIndiceBourse', { valueSearch: e.target[0].value })
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
          background-color: rgb(0, 110, 255);
          border-radius: 0 0 10px 10px;
          color: white;
          font-weight: bold;
        }
      }
    }
}
</style>