<template lang="">
    <div class="home">
        <Header />
        <div class="titre">
            <h1>API DE RECHERCHE</h1>
        <p>Mettre en place à la page d'accueil, la recherche de produits côtés en bourse</p>
        </div>
        
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Axios from '@/_services/axios.service.js'
import axios from 'axios';
export default {
    components: {
        Header
    },
    mounted() {
        let query = 'apple'
        axios.get(`https://api.tiingo.com/tiingo/utilities/search?${query}=apple&token=bbc91cb4a6a8b010a0cc3063d73eb91333ae72ce`, {
            headers : {
                'Content-Type': 'application/json',
            }
        })
            .then(res => console.log(res))
            .catch(err => console.warn(err))
    }
}
</script>
<style lang="">
    
</style>