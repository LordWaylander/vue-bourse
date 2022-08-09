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
            user: ''
        }
    },
    mounted() {
        API.post(`/user/getProfile`)
        .then(res => {
            //console.log(res.data.user);
            this.user = res.data.user.userFirstname +' '+ res.data.user.userName
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