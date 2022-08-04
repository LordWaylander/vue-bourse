<template lang="">
<div>
    <div id="loader">
        <img src="../assets/loader.gif"/>
    </div>
   <Modal :research="request.research" :error="error" @requeteAPI="requeteAPI" @emptyRequestSearch="emptyRequestSearch"/>
    
    <div id="titre">
        <div v-if="error === false">
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
                    </div>
                    <Graphique v-bind:datas="TIME_SERIES_DAILY['Time Series (Daily)']"/>
                </div>
            </div>
        </div>
        <div v-else id="error">
            <h1>{{error}}</h1>
        </div>
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
    props:['query', 'querySearchIndice'],
    data() {
        return {
            request: {
                functions: {
                    GLOBAL_QUOTE: 'GLOBAL_QUOTE',
                    TIME_SERIES_DAILY: 'TIME_SERIES_DAILY',
                    SYMBOL_SEARCH: 'SYMBOL_SEARCH',
                    TIME_SERIES_INTRADAY: 'TIME_SERIES_INTRADAY',
                    TIME_SERIES_WEEKLY: 'TIME_SERIES_WEEKLY',
                    TIME_SERIES_MONTHLY: 'TIME_SERIES_MONTHLY'
                },
                query:'',
                interval: '', // à voir si mis réellement en place
                exchange:'', // marché sur lequel chercher les indices, à mettre en place
                research:'', // recherche searchIndice
            },
            TIME_SERIES_DAILY:'',
            GLOBAL_QUOTE:'',
            variation:'',
            error: false, // gestion d'erreur, pour l'API - surtout gestion requete par minute
        }
    },
    methods:{
        requeteAPI(query){
            this.request.query = query

            document.getElementById("loader").style.display="flex";

            API.get(`/api/time_series_daily/${this.request.query}`)
            .then((res) => {
                    this.TIME_SERIES_DAILY=res.data;
                },
                API.get(`/api/global_quote/${this.request.query}`)
                    .then((res) => {
                        this.GLOBAL_QUOTE=res.data;
                        this.variation=this.GLOBAL_QUOTE["Global Quote"]["10. change percent"];
                        this.variation=(parseFloat(this.variation, 10));
                        this.$emit('queryValueConnected', { queryValueConnected: this.request.query });
                        this.error = false;
                        document.getElementById("loader").style.display="none";
                        document.getElementById('opacityCorps').style.display='none';
                        document.getElementById("titre").style.display="block";
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        document.getElementById("loader").style.display="none";
                        document.getElementById("titre").style.display="block";
                        document.getElementById('opacityCorps').style.display='none';
                    })
                )            
            .catch((err) => { 
                console.log(err);
                this.error = err.response.data;
                document.getElementById('opacityCorps').style.display='none';
                document.getElementById("loader").style.display="none";
                document.getElementById("titre").style.display="block";
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
        }
    },
    mounted() {
        console.log(this.$route);
        this.requeteAPI(this.query);
    },
    watch:{
        'querySearchIndice'(){
            if(this.querySearchIndice.length){
                 this.searchIndice();
            }
        },
        'query'(){
            console.log('query changé reload');
        }
    },
    computed:{
        date() {
            return this.GLOBAL_QUOTE["Global Quote"]["07. latest trading day"].split('-').reverse().join('/');
        },
        dernierRafraichissement() {
            return this.TIME_SERIES_DAILY["Meta Data"]["3. Last Refreshed"].split('-').reverse().join("/");
        }
    },
}
</script>

<style lang="scss">

    #titre{
        display: none;
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
            }
        }

        #error{
            display: flex;
            justify-content: center;
        }
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