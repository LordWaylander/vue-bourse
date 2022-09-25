<template lang="">
  <div>
    <div id="background">
        <div id="inscriptionForm">
            <form  @submit.prevent="signup()">
              <label for="prenom">Prénom</label>
              <input id="prenom" type="text" name="prenom" placeholder="Prenom" v-model="prenom" required/>
              <label for="nom">Nom</label>
              <input id="nom" type="text" name="nom" placeholder="Nom" v-model="nom" required/>
              <label for="mail">Mail</label>
              <input id="mail" type="email" name="mail" placeholder="Mail" v-model="email" required/>

              <label for="username">Nom d'utilisateur</label>
              <input id="user" type="text" name="username" placeholder="Nom d'utilisateur" v-model="username" required/>
              <label for="password">Mot de passe</label>
              <input id="password" type="password" name="password" placeholder="Mot de passe" v-model="password" required/>
              <label for="passwordRepeat">Répétez le mot de passe</label>
              <input id="passwordRepeat" type="password" name="passwordRepeat" placeholder="Répétez le mot de passe" v-model="passwordRepeat" required/>
              <input type="submit" value="S'inscrire" id="submitSignup"/>
            </form>
            <RouterLink to="/connexion" id="connexionLink">
                Déjà un compte ? <span>cliquer ici !</span>
            </RouterLink>
        </div>
        <div v-if="error" id="RefusInscription" class="modalInscription">
          <p>{{error}}</p>
        </div>
    </div>
  </div>
</template>
<script>
import API from '@/_services/api.service.js';
import { reactive } from 'vue'
export const inscription = reactive({
  createdAccount: ''
})

export default {
  data() {
      return{
        prenom:'',
        nom:'',
        email:'',
        username:'',
        password:'',
        passwordRepeat:'',
        error: '',
      }
    },
    methods: {
      signup(){
        let credentials = {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          auth: {
            username: this.username,
            password: this.password,
            passwordRepeat : this.passwordRepeat
          }
        }
        API.post(`/inscription`, credentials)
        .then(res => {
          if(!!res.data.created){
            inscription.createdAccount = res.data.created
            this.prenom = ''
            this.nom = ''
            this.email = ''
            this.username = ''
            this.passwordRepeat = ''
            this.$router.push('/connexion');
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.data);
          this.error = err.response.data.error
        })
      }
    }
}
</script>
<style lang="scss" scoped>
  #background{
    background-image: url('../assets/bourse-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    position: absolute;
    top: 0;
    width: 100%;
}
  #inscriptionForm {
        width: 75%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 12.5%;
        top: 50%;;
    form {
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
      #submitSignup{
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
    #connexionLink{
      color: black;
      text-decoration: none;
      span {
        text-decoration: underline;
      }
    }
  }
  .modalInscription {
    position: absolute;
    z-index: 5;
    top: 15vh;
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  #RefusInscription {
    background-color: #ec0e0e94;
  }
</style>