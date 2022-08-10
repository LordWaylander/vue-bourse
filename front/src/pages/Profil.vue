<template lang="">
    <div>
        <div id="loader">
            <img src="../assets/loader.gif"/>
        </div>
        <div>
            <p>Bonjour {{ user }} bienvenue sur votre profil !</p>
            <Card :userFavoris="userFavoris"/>
        </div>
        
    </div>
</template>

<script>
import API from '@/_services/api.service.js';
import Card from '@/components/Card.vue'

export default {
    components: {
        Card
    },
    data() {
        return {
            user: '',
            userFavoris:''
        }
    },
    beforeCreate() {
        API.post(`/user/getProfile`)
        .then(res => {
            this.user = res.data.user.userFirstname +' '+ res.data.user.userName
            console.log(res.data.user.userFavoris);
            this.userFavoris = res.data.user.userFavoris
        })
        .catch(err => {
            console.log(err);
            //this.$router.push('/connexion');
        })
    },
}
</script>

<style lang="scss">
    #loader {
        display: flex;
        justify-content: center;
        align-items: center;
        
        img{
            width: 100px;
            height: 100px;
        }
    }

</style>