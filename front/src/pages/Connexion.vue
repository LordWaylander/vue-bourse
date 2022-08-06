<template lang="">
    <div id="background">
        <div id="connexionform">
            <form  @submit.prevent="login()">
                <label for="username">Nom d'utilisateur</label>
                <input id="user" type="text" name="username" placeholder="Nom d'utilisateur" v-model="user"/>
                <label for="password">Mot de passe</label>
                <input id="password" type="password" name="password" placeholder="Mot de passe" v-model="password"/>
                <input type="submit" value="Se connecter" id="submitConnexion"/>
            </form>
        </div>
    </div>
</template>

<script>
import API from '@/_services/api.service.js';

export default {
    data() {
        return{
            user:'',
            password:'',
            auth : false
        }
    },
    methods: {
        login() {
            if(this.user == "" || this.password ==""){
                console.warn('ne pas envoyer le form');
            }

            let credentials = {
                user: this.user,
                password: this.password
            }
            API.post(`/login`, credentials)
            .then(res => {
                if(!!res.data.auth){
                    this.$emit('userConnected', { connected: true });
                    this.$router.push('/home');
                }
            })
            .catch(err => console.log(err))
        },
    },
}
</script>

<style lang="scss">
#background{
    background-image: url('../assets/bourse-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
    #connexionform{

        width: 75%;
        display: flex;
        justify-content: center;
        position: absolute;
        left: 12.5%;
        top: 50%;
        form{
            flex-direction: column;
            display: flex;
            align-items: center;
            width: 75%;
            input{
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                background-repeat: no-repeat;
                background-size: contain;
                background-position-x: 0.5%;
                border-radius: 50px;
                &:focus{
                    border: 1px solid rgb(24, 148, 197)
                }
            }
            #user{
                background-image: url('../assets/utilisateur.png');
            }
            #password {
                background-image: url('../assets/cadenas.png');
            }
            #submitConnexion{
                width: 50%;
                margin-top: 1rem;
                background-color: #0051ff;
                border: 2px solid #08f;
                text-decoration: none;
                color: white;
                padding: 0.2rem;
                &:hover {
                    background-color: rgb(0, 110, 255);
                }
                
            }
            
        }
    }
</style>