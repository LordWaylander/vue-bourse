<template lang="">
    <div class="home">
        <Header @sendSearchToParent="setSearch"/>
        <div class="titre">
            <h1>API DE RECHERCHE</h1>
        <p>Mettre en place à la page d'accueil, la recherche de produits côtés en bourse</p>
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
                exchange:''
            },
            valueSearch: 'asasa'
        }
    },
    methods:{
        setSearch(payload) {
            this.request.query = payload.valueSearch
        },
        requeteAPI(){
            let fonction = this.request.functions;
            let query = this.request.query;
            let outputsize = this.request.outputsize
        /**
         * GLOBAL_QUOTE - function=GLOBAL_QUOTE&symbol=${query}${exchange}&outputsize=compact&apikey=${Axios.Token}
         * TIME_SERIES_DAILY - function=TIME_SERIES_DAILY&symbol=${query}${exchange}&outputsize=compact&apikey=${Axios.Token}
         * SYMBOL_SEARCH - function=SYMBOL_SEARCH&keywords=${query}&apikey=${Axios.Token}
         * TIME_SERIES_INTRADAY - function=TIME_SERIES_INTRADAY&symbol=${query}&interval=60min&apikey=${Axios.Token}
         * TIME_SERIES_WEEKLY - function=TIME_SERIES_WEEKLY&symbol=${query}&apikey=${Axios.Token}
         * TIME_SERIES_MONTHLY - function=TIME_SERIES_MONTHLY&symbol=${query}&apikey=${Axios.Token}
         */

        API.Axios.get(`query?function=${fonction.SYMBOL_SEARCH}&keywords=${query}&apikey=${API.Token}`)
            .then(res => console.log(res.data))
            .catch(err => console.warn(err))
        }
    },
    beforeMount() {
        this.requeteAPI();
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
    .titre{
            display: flex;
            flex-direction: column;
            align-items: center;
    }
    
}
</style>