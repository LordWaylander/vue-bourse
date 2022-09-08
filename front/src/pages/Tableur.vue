<template lang="">
  <div>
    <p>{{nameIndice}}</p>
    <form v-on:submit.prevent="submit($event)" id="form" v-if="actions.length">
      <div class="line" :id="'line'+index" v-for="(action, index) in actions" :key="index">
        <div v-html="action" :id="'input'+index" class="input"></div>
        <input type="button" @click="deleteLine(index)" class="deleteLine" />
        <input type="button" @click="updateLine('input'+index)" value="Modifier" />
      </div>
      <div>
        <input type="radio" id="dollar" value="dollar" v-model="deviseIndice">
        <label for="dollar">Dollar</label>
        <input type="radio" id="euro" value="euro" v-model="deviseIndice">
        <label for="euro">Euro</label>
      </div>
      <input type="submit" value="Enregistrer">
    </form>
    <div v-else>
      <p>Vous n'avez pas effectuer encore d'achat, pour pouvez en ajouter en cliquant sur le boutton "Ajouter une ligne"</p>
    </div>

    <div id="addLine">
      <button  @click="addLine()">Ajouter une ligne</button>
    </div>
    <div id="error">
        <h1>{{error}}</h1>
    </div>
  </div>
</template>

<script>
/**
 * Faut refaire le tableur pour afficher clairement les actions achetés + calcul auto de +/- value
 * Faire l'interface pour ajouter / enlever des actions
 * Si pas d'actions, proposer uniquement l'interface pour en ajouter
 */
import API from '@/_services/api.service.js';

export default {
  data() {
    return {
      error:'',
      nameIndice:'',
      deviseIndice:'',
      actions:[],
      count:0
    }
  },
  methods: {
    getPlusValue(symbol){
      API.get(`/tableur/${symbol}`)
      .then(res => {
        if(!!res.data.achat[0]){
          this.deviseIndice = res.data.achat[0].devise;
          res.data.achat[0].listeAchat.forEach(element => {
            const line =`
              <label for="date${this.count}">Date:</label>
              <input type="text" value="${element.date}" name="date" id="date${this.count}" disabled required/>
              <label for="quantite${this.count}">Quantité:</label>
              <input type="text" value="${element.quantite}" name="quantite" id="quantite${this.count}" disabled required/>
              <label for="prixAchat${this.count}">Prix d'achat:</label>
              <input type="text" value="${element.prixAchat}" name="prixAchat" id="prixAchat${this.count}" disabled required/>
              <label for="fraisAchat${this.count}">Frais d'achat:</label>
              <input type="text" value="${element.fraisAchat}" name="fraisAchat" id="fraisAchat${this.count}" disabled required/>
            `;
            this.actions.push(line);
            this.count++;
          });
        }
      })
      .catch(err => {
          console.log(err);
          this.error = err
          document.getElementById('error').style.display = "block";
          //document.getElementById('tableur').style.display = "none";
      })
    },
    addLine(){
      const line = `
        <label for="date${this.count}">Date:</label>
        <input type="text" name="date" id="date${this.count}" placeholder="Date (format JJ/MM/AAAA)" required/>
        <label for="quantite${this.count}">Quantité:</label>
        <input type="text" name="quantite" id="quantite${this.count}" placeholder="Quantité acheté" required/>
        <label for=""prixAchat${this.count}>Prix d'achat:</label>
        <input type="text" name="prixAchat" id="prixAchat${this.count}" placeholder="Prix d'achat" required/>
        <label for="fraisAchat${this.count}">Frais d'achat:</label>
        <input type="text" name="fraisAchat" id="fraisAchat${this.count}" placeholder="Frais d'achat" required/>
      `;
      this.actions.push(line);
      this.count++
    },
    deleteLine(line){
      this.actions.splice(line, 1);
    },
    updateLine(inputID){
       /**
       * pas plus jolie une modal ?
       * Faire un btn "annuler" pour griser a nouveau le btn
       */

      let input = document.getElementById(inputID)
      for (let i = 0; i < input.children.length; i++) {
        if (input.children[i].tagName === "INPUT") {
          input.children[i].removeAttribute('disabled');
        }
      }
    },
    submit(e){
      let trueInputs = []
      let inputs = document.getElementsByClassName('input');

      for (let i = 0; i < inputs.length; i++) {
        trueInputs[i] = {}
        for (let y = 0; y < inputs[i].childNodes.length; y++) {
          
          if (inputs[i].childNodes[y].tagName == 'INPUT') {
            trueInputs[i][inputs[i].childNodes[y].name] = inputs[i].childNodes[y].value
          }

        }
      }

      API.post('/user/tableur',{listeAchat: trueInputs, nameIndice : this.nameIndice, devise: this.deviseIndice})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    let symbol = this.$route.params.symbol
    this.nameIndice = symbol;
    this.getPlusValue(symbol);
  },
}
</script>

<style lang="scss">
#error{
    display: none;
}
#form{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  margin: auto;
  border: 1px solid red;
    .line{
      margin-bottom: 0.25em;
      display: flex;
        .deleteLine{
          background-image: url(../assets/cross_close.png);
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          cursor: pointer;
          border-radius: 0.2em;
          width: 1.5em;
          height: 1.5em;
          background-color: red;
          border: none;
        }
    } 
}
#addLine{
  display: flex;
  justify-content: center;
  margin-top: 1em;
}
</style>