<template lang="">
<div>
    <div id="loader">
        <img src="../assets/loader.gif"/>
    </div>
   <Modal :research="request.research" :error="error" @requeteAPI="requeteAPI" @emptyRequestSearch="emptyRequestSearch"/>
    
    <div id="titre" v-if="error === false">
        <div>
            <div v-if="GLOBAL_QUOTE">
                <div id="entete">
                    <span id="variation" :style="variation > 0 ? {'background-color' : 'green'} : {'background-color' : 'red'}"></span>
                    <div id="GLOBAL_QUOTE">
                        <p>{{GLOBAL_QUOTE["Global Quote"]["01. symbol"]}}</p>
                        <p>Cours Actuel : {{GLOBAL_QUOTE["Global Quote"]["05. price"]}}</p>
                        <p>Cloture précédente : {{GLOBAL_QUOTE["Global Quote"]["08. previous close"]}}</p>
                        <p>Variation : <span :style="variation > 0 ? {'color' : 'green'} : {'color' : 'red'}"> {{GLOBAL_QUOTE["Global Quote"]["10. change percent"]}}</span></p>
                        <p>Mise à jour : {{date}}</p>
                    </div>
                </div>
                <div id="corps">
                    <div id="corpsGLOBAL_QUOTE">
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="2">Séance du {{date}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p>Ouverture :</p> <span>{{GLOBAL_QUOTE["Global Quote"]["02. open"]}}</span></td>
                                    <td><p>Volumes échangés :</p> <span>{{GLOBAL_QUOTE["Global Quote"]["06. volume"]}}</span></td>
                                </tr>
                                <tr>
                                    <td><p>+ Haut :</p> <span>{{GLOBAL_QUOTE["Global Quote"]["03. high"]}}</span></td>
                                    <td><p>+ Bas :</p> <span>{{GLOBAL_QUOTE["Global Quote"]["04. low"]}}</span></td>
                                </tr>
                                <tr>
                                    <td><p>Variation :</p> <span :style="variation > 0 ? {'color' : 'green'} : {'color' : 'red'}">{{GLOBAL_QUOTE["Global Quote"]["09. change"]}}</span></td>
                                    <td><p>Variation :</p> <span :style="variation > 0 ? {'color' : 'green'} : {'color' : 'red'}">{{GLOBAL_QUOTE["Global Quote"]["10. change percent"]}}</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="favlist" v-if="auth && favlist == false">
                            <button @click='addFavoris(GLOBAL_QUOTE["Global Quote"]["01. symbol"])'>Ajouter aux favoris</button>
                        </div>
                        <div class="favlist" v-if="auth && favlist == true">
                            <button @click='deleteFavoris(GLOBAL_QUOTE["Global Quote"]["01. symbol"])'>Supprimer des favoris</button>
                        </div>
                    </div>
                    <Graphique v-bind:datas="TIME_SERIES_DAILY_ADJUSTED['Time Series (Daily)']"/>
                </div>
            </div>
        </div>
        
    </div>
    <div v-else id="error">
            <h1>{{error}}</h1>
        </div>
</div>
</template>

<script>
import Graphique from '@/components/Graphique.vue';
import Modal from '@/components/ModalSearchIndice.vue'
import API from '@/_services/api.service.js';

export default {
    components: {
        Graphique,
        Modal
    },
    props:['querySearchIndice', 'auth'],
    data() {
        return {
            request: {
                functions: {
                    GLOBAL_QUOTE: 'GLOBAL_QUOTE',
                    TIME_SERIES_DAILY_ADJUSTED: 'TIME_SERIES_DAILY_ADJUSTED',
                    SYMBOL_SEARCH: 'SYMBOL_SEARCH',
                    TIME_SERIES_INTRADAY: 'TIME_SERIES_INTRADAY',
                    TIME_SERIES_WEEKLY: 'TIME_SERIES_WEEKLY',
                    TIME_SERIES_MONTHLY: 'TIME_SERIES_MONTHLY'
                },
                query:'',
                //interval: '', // à voir si mis réellement en place
                //exchange:'', // marché sur lequel chercher les indices, à mettre en place
                research:'', // recherche searchIndice
            },
            TIME_SERIES_DAILY_ADJUSTED:'',
            GLOBAL_QUOTE:'',
            variation:'',
            error: false, // gestion d'erreur, pour l'API - surtout gestion requete par minute
            favlist: false
        }
    },
    methods:{
        requeteAPI(query){
            // cookie pour mémoriser la dernière requete, validité 10min
            $cookies.set('query', query, 60*10)
            document.getElementById("loader").style.display="flex";
            this.isFavList(query);

            API.get(`/api/time_series_daily_adjusted/${query}`)
            .then((res) => {
                    console.log(res);
                    this.TIME_SERIES_DAILY_ADJUSTED=res.data;
                },
                API.get(`/api/global_quote/${query}`)
                    .then((res) => {
                        this.GLOBAL_QUOTE=res.data;
                        this.variation=this.GLOBAL_QUOTE["Global Quote"]["10. change percent"];
                        this.variation=(parseFloat(this.variation, 10));
                        this.error = false;
                        document.getElementById("loader").style.display="none";
                        document.getElementById('opacityCorps').style.display='none';
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        document.getElementById("loader").style.display="none";
                        document.getElementById('opacityCorps').style.display='none';
                    })
                )            
            .catch((err) => { 
                console.log(err);
                this.error = err.response.data;
                document.getElementById("loader").style.display="none";
                document.getElementById('opacityCorps').style.display='none';
            })
        },
        searchIndice() {
            let query = this.querySearchIndice;
            API.get(`/api/symbol_search/${query}`)
            .then((res) => {
                this.error = false;
                this.request.research = res.data;
                document.getElementById('opacityCorps').style.display='block';
            })
            .catch((err) => {
                console.log(err);
                document.getElementById('opacityCorps').style.display='none';
                this.error = err.response.data;
            })
        },
        emptyRequestSearch(payload){
            this.$emit('emptyRequestSearch', payload)
        },
        isFavList(query){
            /**
             * pète une erreur si 
             * 1) user pas logué, logique car lancement au mounted sans vérification si user logué
             * 2) vérification si user logué ET qu'il appuye sur F5, car la props "auth" de app.vue
             * définie sur false passe en 1er AVANT le résultat du created de app.vue
             * donc la props reste sur false et la fonction est pas lancée
             * 
             * -> résolution en vérifiant si cookie token, mais je trouve pas ça propre
             */
            if($cookies.isKey('token')) {
                API.get(`/user/isFavList/${query}`)
                .then(res => {
                    this.favlist = res.data
                })
            }
        },
        addFavoris(indice){
            API.patch(`/user/addFavoris`, {indice: indice})
            .then(res => {
                this.favlist = res.data.add
            })
        },
        deleteFavoris(indice){
            API.delete(`/user/deleteFavoris/${indice}`)
            .then(res => {
                this.favlist = !res.data.delete
            })
        }
    },
    mounted() {
        if($cookies.isKey('query')){
            this.request.query = $cookies.get('query')
        }else{
            this.request.query = 'MSFT'
        }
        this.requeteAPI(this.request.query);
    },
    watch:{
        'querySearchIndice'(){
            if(this.querySearchIndice.length){
                 this.searchIndice();
            }
        },
    },
    computed:{
        date() {
            return this.GLOBAL_QUOTE["Global Quote"]["07. latest trading day"].split('-').reverse().join('/');
        },
        dernierRafraichissement() {
            return this.TIME_SERIES_DAILY_ADJUSTED["Meta Data"]["3. Last Refreshed"].split('-').reverse().join("/");
        }
    },
}
</script>

<style lang="scss" scoped>

    #titre{
        display: block;
        margin: 50px;
        #entete{
            display: flex;
            
            #GLOBAL_QUOTE{
            border: 2px solid rgb(129, 155, 156);
            min-height: min-content;
            padding: 10px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            flex-grow: 1;
            p{
                display: flex;
                justify-content: center;
            }
            }
            #variation{
                width: 10px;
            }
        }

        #corps{
            display: grid;
            grid-template-columns: 25% 1fr;
            margin-top: 2.5%;
            #corpsGLOBAL_QUOTE{
                table{
                    width: 100%;
                    border-collapse: collapse;
                    tbody{
                        tr:nth-child(2n+1){
                            background-color: rgb(234, 234, 234);
                        }
                    }
                    p{
                        margin: 0;
                        font-weight: bold;
                        color: darkorange;
                        text-decoration: underline;
                    }
                }
                .favlist {
                    display: flex;
                    justify-content: center;
                    margin-top: 1em;
                    button {
                        background-color: #0051ff;
                        border: 2px solid #08f;
                        border-radius: 50px;
                        color: white;
                        padding: 0.2rem;
                    }
                }
            }
        }
    }
    #error{
        display: flex;
        justify-content: center;
    }
    
    #loader {
        display: none;
        justify-content: center;
        align-items: center;
        
        img{
            width: 100px;
            height: 100px;
        }
    }
    
</style>