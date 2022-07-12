<template lang="">
    <div class="home">
        <Header @searchIndiceBourse="searchIndiceBourse"/>

        <div id="loader">
            <img src="../assets/loader.gif"/>
        </div>

        <div id="titre">
            <div v-if="GLOBAL_QUOTE" id="GLOBAL_QUOTE">
                {{GLOBAL_QUOTE["Global Quote"]}}
            </div>
            <div v-else>
                <h1>Données non disponibles</h1>
            </div>
            
            <div v-if="TIME_SERIES_INTRADAY" id="TIME_SERIES_INTRADAY">
                {{TIME_SERIES_INTRADAY["Meta Data"]}}
            </div>
            <div v-else>
                <h1>Données non disponibles</h1>
            </div>
        </div> 
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import API from '@/_services/axios.service.js'
export default {
    components: {
        Header
    },
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
                interval: '',
                outputsize: 'compact',
                query:'msft',
                exchange:'',
            },
            TIME_SERIES_INTRADAY:'',
            GLOBAL_QUOTE:''
        }
    },
    methods:{
        searchIndiceBourse(payload) {
            this.request.query = payload.valueSearch
        },
        requeteAPI(){
            let fonction = this.request.functions;
            let query = this.request.query;
            let outputsize = this.request.outputsize;
        /**
         * GLOBAL_QUOTE - function=GLOBAL_QUOTE&symbol=${query}${exchange}&outputsize=compact&apikey=${API.Token} // trading AJD
         * TIME_SERIES_DAILY - function=TIME_SERIES_DAILY&symbol=${query}${exchange}&outputsize=compact&apikey=${API.Token} // trading AJD par heure
         * SYMBOL_SEARCH - function=SYMBOL_SEARCH&keywords=${query}&apikey=${API.Token} // recherche d'indices
         * TIME_SERIES_INTRADAY - function=TIME_SERIES_INTRADAY&symbol=${query}&interval=60min&apikey=${API.Token} // trading par jour & interval=min         
         * TIME_SERIES_WEEKLY - function=TIME_SERIES_WEEKLY&symbol=${query}&apikey=${API.Token} // trading par semaine
         * TIME_SERIES_MONTHLY - function=TIME_SERIES_MONTHLY&symbol=${query}&apikey=${API.Token} // tranding par mois
         */

        API.Axios.get(`query?function=TIME_SERIES_INTRADAY&symbol=${query}&interval=60min&apikey=${API.Token}`)
            .then(
                (res) => {
                    this.TIME_SERIES_INTRADAY=res.data;
                },
                API.Axios.get(`query?function=GLOBAL_QUOTE&symbol=${query}&outputsize=compact&apikey=${API.Token}`)
                    .then((res) => {
                        this.GLOBAL_QUOTE=res.data
                    })
                    .then(() => {
                        document.getElementById("loader").style.display="none",
                        document.getElementById("titre").style.display="grid"
                    })
                )              
            .catch(err => console.warn(err))
            
        }
    },
    mounted() {
        setTimeout(this.requeteAPI, 1000)
        
        
    },
    watch:{
        'request.query'() {
            this.requeteAPI();
        }
    }
}
</script>

<style lang="scss">
.home {
    #titre{
            display: grid;
            grid-template-columns: 6;
            grid-template-rows: 4;
            display: none;
        #GLOBAL_QUOTE{
           
        }
        #TIME_SERIES_INTRADAY{
           
        }
    }
    #loader {
        display: flex;
        justify-content: center;
        align-items: center;
        //display: none
        img{
            width: 100px;
            height: 100px;
        }
    }
    
}
</style>