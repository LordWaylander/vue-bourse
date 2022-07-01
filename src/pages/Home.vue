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
        axios(`https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=dpgNWkJsOpCylepMorcGhFYUoQiVsFZK`, {
            headers : {
                'Content-Type': 'application/json',
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.warn(err))
    }
}
</script>
<style lang="">
    
</style>