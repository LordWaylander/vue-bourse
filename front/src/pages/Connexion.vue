<template lang="">
    <Header/>
    <div id="connexionform">
        <form  @submit.prevent="login($event)">
            <label for="username">Nom d'utilisateur</label>
            <input id="user" type="text" name="username" placeholder="Nom d'utilisateur"/>
            <label for="password">Mot de passe</label>
            <input id="password" type="password" name="password" placeholder="Mot de passe"/>
            <input type="submit" value="Se connecter" id="submitConnexion"/>
        </form>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import API from '@/_services/api.service.js';

export default {
     components: {
        Header,
    },
    methods: {
        login(event) {
            let user = event.target[0].value;
            let password = event.target[1].value;

            if(user == "" || password ==""){
                console.warn('ne pas envoyer le form');
            }

            let credentials = {
                user:user,
                password:password
            }
            
            API.post(`/login`, credentials)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data))
        },
    },
}
</script>

<style lang="scss">
    #connexionform{
        border: 1px solid red;
        border: 1px solid red;
        width: 75%;
        display: flex;
        justify-content: center;
        position: absolute;
        left: 12.5%;
        top: 50%;
        form{
            flex-direction: column;
            display: flex;
            width: 75%;
            label{
                display: flex;
                justify-content: center;
            }
            input{
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                background-repeat: no-repeat;
                background-size: contain;
                background-position-x: 2%;
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
                background-color: aquamarine;
                margin-top: 1rem;
                
            }
            
        }
    }
</style>