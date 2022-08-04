<template lang="">
    <div>
        <p>Bonjour {{ user }} bienvenue sur votre profil !</p>
    </div>
</template>

<script>
import jwtDecode from 'vue-jwt-decode'
export default {
    data() {
        return {
            user: ""
        }
    },
    mounted() {
        let decodedToken = jwtDecode.decode(localStorage.token);
        this.user = decodedToken.username
    },
}
</script>

<style lang="">
    
</style>