<template lang="">
    <div>
        <div>
            <div v-for="(userFavori, index) in userFavoris" :key="index">
                {{userFavori}}
                {{index}}
                {{requeteAPI(userFavori)}}
                {{symbol}}
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/_services/api.service.js';
export default {
    props: ["userFavoris"],
    data() {
        return {
            symbol: 'a',
            a: 0
        }
    },
    methods: {
        async requeteAPI(query) {
            /**
             * @hsdjkqf,jnffvjbh,wfds
             * marche po, ça m'emmerde ><
             * faut lancer la fonction ds la boucle plus haut, mais j'sais pas comment faire
             */
            if (query) {
                 console.log('*** method');
                console.log(query);
                //query.forEach(element => {
                    let res = await API.get(`/api/global_quote/${query}`)
                    console.log(res.data);
                    return res.data["Global Quote"]
                    return this.symbol = res.data["Global Quote"]
                    /*.then(res => {
                        console.log(res.data["Global Quote"]);
                        return this.symbol = res.data["Global Quote"]
                        //console.log(this.symbol);
                    })
                    .catch(err => {
                        console.log(err);
                    })*/
                //});
            }
            
            
        }
    },
}
</script>

<style lang="scss">
    
</style>