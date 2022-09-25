<template lang="">
    <div id="conteneurCard" v-if="data.length">
        <div v-for="value in data" class="card" v-bind:id="value['01. symbol']">
            <div>
                <p>Symbol : <span>{{value["01. symbol"]}}</span></p>
                <p>Cloture précédente : <span>{{value["08. previous close"]}}</span></p>
                <p>Ouverture : <span>{{value["02. open"]}}</span></p>
                <p>Variation % : <span :style="variation >0 ? {'color' : 'green'} : {'color' : 'red'}">{{value["10. change percent"]}}</span></p>
            </div>
            <button class="btnP">Graphique</button>
             <RouterLink :to="`/tableur/${value['01. symbol']}`">
                <button class="btnP">Calcul +/- value</button>
            </RouterLink>
            <button class="btnP" @click='deleteFavoris(value["01. symbol"])'>Retirer des favoris</button>
        </div>
    </div>
    <div id="errors" v-else-if="error">
        <h1>{{error}}</h1>
    </div>
    <div v-else>
        <h1>Erreur quelquonque à gérer ! (card.vue ligne 21)</h1>
    </div>
</template>

<script>
import API from '@/_services/api.service.js';
/**
 * Ajout d'un graphique dans le Card ? (+/- 1mois max) ou btn détail et ouverture modal
 * mettre en place le calcul de +/- value -> suppr du header + mise en place modal
 */
export default {
    props: ["userFavoris"],
    data() {
        return {
            data: [],
            variation:'',
            error:''
        }
    },
    methods: {
        requeteAPI(query) {
            API.get(`/api/global_quote/${query}`)
            .then(res => {
                this.variation=res.data["Global Quote"]["10. change percent"];
                this.variation=(parseFloat(this.variation, 10));
                this.data.push(res.data["Global Quote"]);
                document.getElementById('loader').style.display='none';
            })
            .catch(err => {
                console.log(err);
                this.error = err.response.data
                document.getElementById('loader').style.display='none';
            })
        },
        deleteFavoris(indice){
            API.delete(`/user/deleteFavoris/${indice}`)
            .then(res => {
                document.getElementById(indice).style.display="none"
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    watch:{
        /**
         * obligé d'utiliser un watch sur la props, car "empty string" au created / mounted, 
         * donc voir quand elle change de valeur et lancer la fonction
         * puis remplir le tableau
         */
        'userFavoris'(){
            if(this.userFavoris.length) {
                this.userFavoris.forEach(query => {
                    this.requeteAPI(query)
                });
            }else{
                this.error = "Merci de rajouter des favoris"
                //document.getElementById('cardContener').style.display = "block";
                document.getElementById('loader').style.display='none';
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.btnP{
    background-color: #0051ff;
    border: 2px solid #08f;
    border-radius: 50px;
    text-decoration: none;
    color: white;
    padding: 0.2rem;
    margin: 0 0 10px;
    width: 100%;
    &:hover {
        background-color: rgb(0, 110, 255);
    }
}
#conteneurCard{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .card {
        border: 1px solid red;
        margin: 2em;
        border-radius: 1em;
        padding: 1em;
        display: flex;
        flex-direction: column;
        width: 250px;
        div {
            margin-bottom: 1em;
        }
        a{
            display: flex;
            justify-content: center;
            text-decoration: none;
        }
    }
}
    
</style>