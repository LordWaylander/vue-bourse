<template lang="">
<div class="tableur">
    <Header />
     <div>
        <form v-on:submit.prevent="submit($event)">
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
    </div>

    <div id="recap">
        <div v-if="deviseUSD === true" class="values">
            <p><span class="coutTotalAchat">Cout Total d'achat (frais achat compris): </span>{{coutTotalAchat}} €</p>
            <p><span class="coutTotalAction">Cout Total / action : </span>{{coutTotalAction}} €</p>
            <p style="color: red" ><span class="investissementTotal">Investissement total SANS LES FRAIS DE VENTE: </span>{{investissementTotal}} €</p>

            <p><span class="investissementTotalApresVente">Investissement total apres vente : </span>{{investissementTotalApresVente}} €</p>
            <p><span class="plusValue">+/- value : </span>{{plusValue}} €</p>
            <p><span class="deviseUSD">Taux de change USD actuel : </span>{{form.coursDollarActuel}} $</p>
            
            <p class="v0"><span>Prix de rachat action à +value 0% : </span>{{value0}} €</p> 
            <p class="v50"><span>Prix de rachat action à +value 50% : </span>{{value50}} €</p>
            <p class="v100"><span>Prix de rachat action à +value 100% : </span>{{value100}} €</p>
        </div>
        <div v-else-if="deviseUSD === false" class="values">
            <p><span class="coutTotalAchat">Cout Total d'achat (frais achat compris): </span>{{coutTotalAchat}} €</p>
            <p><span class="coutTotalAction">Cout Total / action : </span>{{coutTotalAction}} €</p>
            <p style="color: red"><span class="investissementTotal">Investissement total SANS LES FRAIS DE VENTE: </span>{{investissementTotal}} €</p>

            <p><span class="investissementTotalApresVente">Investissement total apres vente : </span>{{investissementTotalApresVente}} €</p>
            <p><span class="plusValue">+/- value : </span>{{plusValue}} €</p>

            <p class="v0"><span>Prix de rachat action à +value 0% : </span>{{value0}} €</p> 
            <p class="v50"><span>Prix de rachat action à +value 50% : </span>{{value50}} €</p>
            <p class="v100"><span>Prix de rachat action à +value 100% : </span>{{value100}} €</p>
        </div>
    </div>
</div>
</template>


<script>
import Header from '@/components/Header.vue'
export default {
    components:{
        Header
    },
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
            coutTotalAchat:'',
            coutTotalAction:'',
            investissementTotal:'',
            investissementTotalApresVente:'',
            plusValue:'',
            value0: '',
            value50: '',
            value100: '',
            deviseUSD: '',
        } 
    },
    methods: {
        submit(e) {
            this.deviseUSD = e.target[5].checked;
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
            this.value100 = (this.investissementTotalApresVente-this.plusValue)/this.form.quantite;
        },
    }
}
</script>