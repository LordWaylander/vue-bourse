<template lang="">
    <div id="loader">
        <img src="../assets/loader.gif"/>
    </div>

    <div id="opacityCorps">
        <div id="modalBackground" v-if="error === false">
            <div id="close" @click="closeModal"><img src="../assets/cross_close.png"/></div>
            <div v-if="request.research.length > 0" id="modalCorps">
                <div v-for="element in request.research">
                    <div id="modalElement" @click="requeteAPI(element['1. symbol'])">
                        <p>Nom : {{element["2. name"]}}</p>
                        <p>Région : {{element["4. region"]}}</p>
                        <p>Devise : {{element["8. currency"]}}</p>
                    </div>
                </div>
            </div>
            <div v-else id="empty">
                Aucune correspondance trouvée !
            </div>
        </div>
    </div>
    
        
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
        
</template>

<script>
import Graphique from '@/components/Graphique.vue';
import API from '@/config/api.service.js';

export default {
    components: {
        Graphique
    },
    props:['query'],
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
            document.getElementById("loader").style.display="flex";

            API.get(`/api/time_series_daily/${query}`)
            .then((res) => {
                    this.TIME_SERIES_DAILY=res.data;
                },
                API.get(`/api/global_quote/${query}`)
                    .then((res) => {
                        this.GLOBAL_QUOTE=res.data;
                        this.variation=this.GLOBAL_QUOTE["Global Quote"]["10. change percent"];
                        this.variation=(parseFloat(this.variation, 10));
                        document.getElementById("loader").style.display="none";
                        document.getElementById('opacityCorps').style.display='none';
                        document.getElementById("titre").style.display="block";
                    })
                    .catch((err) => {
                        console.log(err);
                        this.error = err.response.data;
                        document.getElementById("loader").style.display="none";
                        document.getElementById("titre").style.display="block";
                    })
                )            
            .catch((err) => { 
                console.log(err);
                this.error = err.response.data;
                document.getElementById("loader").style.display="none";
                document.getElementById("titre").style.display="block";
            })
        },
        searchIndice() {
            let query = this.query;
            API.get(`/api/symbol_search/${query}`)
            .then((res) => {
                this.request.research = res.data;
                document.getElementById('opacityCorps').style.display='block';
            })
            .catch((err) => {
                this.error = err.response.data;
            })
        },
        closeModal(){
            document.getElementById('opacityCorps').style.display='none';
            this.request.research="";
            this.request.query="";
        }
    },
    mounted() {
        this.requeteAPI(this.query);
    },
    watch:{
        'query'(){
            if(this.query.length){
                 this.searchIndice();
            }
        },
    },
    computed:{
        date() {
            return this.GLOBAL_QUOTE["Global Quote"]["07. latest trading day"].split('-').reverse().join('/');
        },
        dernierRafraichissement() {
            return this.TIME_SERIES_DAILY["Meta Data"]["3. Last Refreshed"].split('-').reverse().join("/");
        }
    }
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
    #opacityCorps{
        height: 100vh;
        z-index: 50;
        position: absolute;
        left: 12.5;
        width: 100%;
        background-color: #f0f8ffd9;
        top: 0%;
        display:none;
        #modalBackground{
            background-color: rgba(221, 217, 217, 0.9);
            height: max-content;
            width: 75%;
            z-index: 10;
            position: absolute;
            left: 12.5%;
            top:25%;
            border: 1px solid black;
            border-radius: 5%;
            box-shadow: 1px 5px 10px #007ce8;
            #close{
                display: flex;
                justify-content: end;
                margin-right: 3%;
                margin-top: 1%;
                img{
                    width: 25px;
                    max-width: 3%;
                    cursor: pointer;
                }
            }
            #modalCorps{
                display: flex;
                flex-direction: column;
                margin: 20px;
                #modalElement{
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                    p{
                        margin-right: 2%;
                    }
                }
            }
            #empty{
                text-align: center;
                margin-bottom: 2%;
            }
        }
    }
    
</style>