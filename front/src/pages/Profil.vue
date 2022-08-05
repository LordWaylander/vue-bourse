<template lang="">
    <div>
        <div id="loader">
            <img src="../assets/loader.gif"/>
        </div>
        <div>
            <p>Bonjour {{ user }} bienvenue sur votre profil !</p>
        </div>
        
    </div>
</template>

<script>
import API from '@/_services/api.service.js';

export default {
    data() {
        return {
            userId: "",
            user: 'Nom_User'
        }
    },
    mounted() {
       let token = localStorage.getItem('token');
        if (!!token){
            API.post(`/user/getProfile`, {token})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }else {
            this.$router.push('/connexion');
        }

        
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