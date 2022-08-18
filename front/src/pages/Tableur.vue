<template lang="">
<div>
    <!--
    <div  id="tableur">
        <form v-on:submit.prevent="submit($event)" id="formTableur">
            <label for="coursAchatAction">Cours de l'action à l'achat</label>
            <input type="text" placeholder="Cout action à l'achat" name="coursAchatAction" v-model="form.coursAchatAction"/>
            <label for="quantite">Quantité</label>
            <input type="text" placeholder="quantité" name="quantite" v-model="form.quantite"/>
            <label for="fraisAchat">Frais d'achat</label>
            <input type="text" placeholder="frais d'achat" name="fraisAchat" v-model="form.fraisAchat"/>
            <label for="fraisVente">Frais de vente</label>
            <input type="text" placeholder="frais de vente" name="fraisVente" v-model="form.fraisVente"/>
            <label for="coursActionActuelle">Cours de l'action à l'instant</label>
            <input type="text" placeholder="Cours action actuelle" name="coursActionActuelle" v-model="form.coursActionActuelle"/>
            <div id="checkbox">
                <label for="USDinput" id="USDcheck">USD ?</label>
                <input type="checkbox" id="USDinput" v-model="form.USDinput"/>
            </div>
            <div v-if="form.USDinput" id="USD">
                <label for="coursDollarAchat">Cours du dollar à l'achat</label>
                <input type="text" name="coursDollarAchat" placeholder="Cours du Dollar à l'achat" v-model="form.coursDollarAchat"/>
                <label for="coursDollarActuel">Cours du dollar actuellement</label>
                <input type="text" name="coursDollarActuel" placeholder="Cours du Dollar actuellement" v-model="form.coursDollarActuel"/>
            </div>
            <input type="submit" value="Envoyer" />
        </form>        

        <div id="recap">
            <div class="values">
                <p><span class="coutTotalAchat">Cout Total d'achat (frais achat compris): </span>{{coutTotalAchat}} €</p>
                <p><span class="coutTotalAction">Cout Total / action : </span>{{coutTotalAction}} €</p>
                <p style="color: red"><span class="investissementTotal">Investissement total SANS LES FRAIS DE VENTE: </span>{{investissementTotal}} €</p>

                <p><span class="investissementTotalApresVente">Investissement total apres vente : </span>{{investissementTotalApresVente}} €</p>
                <p><span class="plusValue">+/- value : </span>{{plusValue}} €</p>
                <p v-if="deviseUSD === true"><span class="deviseUSD">Taux de change USD actuel : </span>{{form.coursDollarActuel}} $</p>

                <p class="v0"><span>Prix de rachat action à +value 0% : </span>{{value0}} €</p> 
                <p class="v50"><span>Prix de rachat action à +value 50% : </span>{{value50}} €</p>
                <p class="v100"><span>Prix de rachat action à +value 100% : </span>{{value100}} €</p>
            </div>
        </div>
    </div>
    -->
    <p>{{actions.name}}</p>
    <form v-on:submit.prevent="submit($event)" id="formTest">
        <div id="getLine"></div>
        <div id="addLine"></div>
        <input type="submit" value="Enregistrer">
     </form>
     <button @click="addLine(count)">Ajouter une ligne</button>
     <button @click="updateLine()">Modifier</button>

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
import { h, defineComponent } from 'vue'


export default {
    data(){
        return{
            form: {
                coursAchatAction: '0',
                coursAchatActionTransition:'',
                quantite: '0',
                fraisAchat: '0',
                fraisVente: '0',
                coursActionActuelle: '0',
                coursActionActuelleTransition:'',
                USDinput: false,
                coursDollarAchat: '0',
                coursDollarActuel: '0',
            },
            coutTotalAchat: 0,
            coutTotalAction: 0,
            investissementTotal: 0,
            investissementTotalApresVente: 0,
            plusValue: 0,
            value0: 0,
            value50: 0,
            value100: 0,
            deviseUSD: 0,
            error: false,

            /**
             * new format a partir d'ici
             */
            actions:'',
            count:1
        } 
    },
    methods: {
        // renseignement : cours dollar actuel, frais de vente, cours action acutelle
        submit(e) {
            console.log(e.target);
            /*this.deviseUSD = e.target[5].checked;
            this.form.coursAchatAction = parseFloat(this.form.coursAchatAction);
            this.form.quantite = parseInt(this.form.quantite);
            this.form.fraisAchat = parseFloat(this.form.fraisAchat);
            this.form.fraisVente =  parseFloat(this.form.fraisVente);
            this.form.coursActionActuelle =  parseFloat(this.form.coursActionActuelle);
            this.form.coursDollar = parseFloat(this.form.coursDollar);

            if (this.deviseUSD) {
                this.form.coursAchatActionTransition = this.form.coursAchatAction/this.form.coursDollarAchat;
                this.form.coursActionActuelleTransition = this.form.coursActionActuelle/this.form.coursDollarActuel;
            } else {
                this.form.coursAchatActionTransition = this.form.coursAchatAction;
                this.form.coursActionActuelleTransition = this.form.coursActionActuelle;
            }

            this.coutTotalAchat = (this.form.coursAchatActionTransition*this.form.quantite)+this.form.fraisAchat;
            this.coutTotalAction = this.coutTotalAchat/this.form.quantite;
            this.investissementTotal = this.form.quantite*this.form.coursActionActuelleTransition;
            this.investissementTotalApresVente = this.investissementTotal-this.form.fraisVente;
            this.plusValue = this.investissementTotalApresVente-this.coutTotalAchat;

            this.value0 = (this.investissementTotalApresVente-(this.plusValue*(0/100)))/this.form.quantite;
            this.value50 = (this.investissementTotalApresVente-(this.plusValue*(50/100)))/this.form.quantite;
            this.value100 = (this.investissementTotalApresVente-this.plusValue)/this.form.quantite;*/
        },
        getPlusValue(){
            let symbol = this.$route.params.symbol
            API.get(`/tableur/${symbol}`)
            .then(res => {
                console.log(res.data);
                this.actions = res.data;

                const getLine = document.getElementById('getLine');
                //res.data.listeAchat.forEach(element => {
                    const line = `
                    <div class="line" id="line${this.count}">
                        <label for="">Date:</label>
                        <input type="text" value="${res.data.listeAchat[0].date}" name="date${this.count}" disabled required/>
                        <label for="">Quantité:</label>
                        <input type="text" value="${res.data.listeAchat[0].quantite}" name="quantite${this.count}" disabled required/>
                        <label for="">Prix d'achat:</label>
                        <input type="text" value="${res.data.listeAchat[0].prixAchat}" name="prixAchat${this.count}" disabled required/>
                        <label for="">Frais d'achat:</label>
                        <input type="text" value="${res.data.listeAchat[0].fraisAchat}" name="fraisAchat${this.count}" disabled required/>
                        <input type="button" onClick=${this.deleteLine(1)} class="deleteLine" />
                    </div>`;
                    getLine.innerHTML+=line
                    this.count++;
                    //console.log(this.deleteLine(2));
                //});
                //@click="deleteLine(line${this.count})"
            })
            .catch(err => {
                console.log(err);
                this.error = err
                document.getElementById('error').style.display = "block";
                //document.getElementById('tableur').style.display = "none";
            })
        },
        addLine(count){
            /**
             * Attention si ligne modifier !
             */
            const addLine = document.getElementById('addLine');
            const newLine = `
            <div class="line" id="line${count}">
                <label for="">Date:</label>
                <input type="text" name="date${count}" placeholder="Date (format JJ/MM/AAAA)" required/>
                <label for="">Quantité:</label>
                <input type="text" name="quantite${count}" placeholder="Quantité acheté" required/>
                <label for="">Prix d'achat:</label>
                <input type="text" name="prixAchat${count}" placeholder="Prix d'achat" required/>
                <label for="">Frais d'achat:</label>
                <input type="text" name="fraisAchat${count}" placeholder="Frais d'achat" required/>
                <input type="button" onclick="deleteLine(line${this.count})" class="deleteLine" />
            </div>`;

            addLine.innerHTML+=newLine;
            this.count++;
        },
        updateLine(){
            /**
             * pas plus jolie une modal ?
             */
            const lines = document.querySelectorAll('input')
            lines.forEach(element => {
                element.removeAttribute('disabled')
            });
        },
        deleteLine(line){
            console.log('line '+line+' select');
            let lot = document.getElementById('line1');
            console.log(lot); // null WTF
        }

    },
    mounted() {
        this.getPlusValue();
    },
}
</script>

<style lang="scss">
#error{
    display: none;
}
#formTest{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    margin: auto;
    border: 1px solid red;
    .line{
    margin-bottom: 0.25em;
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
    #formTableur {
        margin-top: 5%;
        display:flex;
        flex-direction: column;
        margin-left: 25%;
        margin-right: 25%;

        label,input {
            text-align: center;
        }
        input{
            margin-bottom: 5px;
        }
        #checkbox {
            text-align: center;
        }
        #USD {
            display: flex;
            flex-direction: column;
            text-align: center;
        }
    }
    #recap{
        margin: 2rem 10%;
    }
    .values {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 
        'a b c'
        'd e f'
        'g h i';
        gap: 10px;

        .coutTotalAchat {
            grid-area: a;
        }
        .coutTotalAction {
            grid-area: b;
        }
        .investissementTotal {
            grid-area: c;
        }
        .investissementTotalApresVente {
            grid-area: d;
        }
        .plusValue {
            grid-area: e;
        }
        .deviseUSD {
            grid-area: f;
        }
        .v0 {
            grid-area: g;
        }
        .v50 {
            grid-area: h;
        }
        .v100 {
            grid-area: i;
        }
    }
</style>