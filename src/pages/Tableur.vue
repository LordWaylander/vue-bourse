<template lang="">
<div class="tableur">
    <Header />
     <div>
        <form v-on:submit.prevent="submit($event)">
            <label for="coursAchatAction">Cours de l'action à l'achat</label>
            <input type="text" placeholder="Cout action à l'achat" name="coursAchatAction"/>
            <label for="quantite">Quantité</label>
            <input type="text" placeholder="quantité" name="quantite"/>
            <label for="fraisAchat">Frais d'achat</label>
            <input type="text" placeholder="frais d'achat" name="fraisAchat"/>
            <label for="fraisVente">Frais de vente</label>
            <input type="text" placeholder="frais de vente" name="fraisVente"/>
            <label for="coursActionActuelle">Cours de l'action à l'instant</label>
            <input type="text" placeholder="Cours action actuelle" name="coursActionActuelle"/>
            <div id="checkbox">
                <label for="USD" id="USDcheck">USD ?</label>
                <input type="checkbox" id="USDinput" @click="changeUSD($event)"/>
            </div>
            <div v-if="deviseUSDCheckbox" id="USD">
                <label for="coursDollar">Cours du dollar</label>
                <input type="text" name="coursDollar" placeholder="Cours du Dollar"/>
            </div>
            
            
            <input type="submit" value="Envoyer" />
        </form>        
    </div>

    <div id="recap">
        <div v-if="deviseUSD === true" class="values">
            <p><span class="coutTotalAchat">Cout Total d'achat : </span>{{coutTotalAchat}} $</p>
            <p><span class="coutTotalAction">Cout Total / action : </span>{{coutTotalAction}} $</p>
            <p><span class="investissementTotal">Investissement total SANS LES FRAIS DE VENTE: </span>{{investissementTotal}} $</p>
            <p><span class="investissementTotalApresVente">Investissement total apres vente : </span>{{investissementTotalApresVente}} $</p>
            <p><span class="plusValue">+/- value : </span>{{plusValue}} $</p>
            <p><span class="deviseUSD">Taux de change USD : </span>{{deviseUSDValue}}</p>
            
            <p class="v0">{{value0}} $</p> 
            <p class="v50">{{value50}} $</p>
            <p class="v100">{{value100}} $</p>
        </div>
        <div v-else-if="deviseUSD === false" class="values">
            <p><span class="coutTotalAchat">Cout Total d'achat : </span>{{coutTotalAchat}} €</p>
            <p><span class="coutTotalAction">Cout Total / action : </span>{{coutTotalAction}} €</p>
            <p><span class="investissementTotal">Investissement total SANS LES FRAIS DE VENTE: </span>{{investissementTotal}} €</p>
            <p><span class="investissementTotalApresVente">Investissement total apres vente : </span>{{investissementTotalApresVente}} €</p>
            <p><span class="plusValue">+/- value : </span>{{plusValue}} €</p>
            <!--<p><span class="deviseUSD">Taux de change USD : </span>{{deviseUSDValue}}</p>-->

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
            coutTotalAchat:'',
            coutTotalAction:'',
            investissementTotal:'',
            investissementTotalApresVente:'',
            plusValue:'',
            value0: '',
            value50: '',
            value100: '',
            deviseUSD: '',
            deviseUSDCheckbox: false,
            deviseUSDValue: 1.0534
        } 
    },
    methods: {
        submit(e) {
            this.deviseUSD = e.target[5].checked;
            let coursAchatAction = parseFloat(e.target[0].value);
            let quantite = parseInt(e.target[1].value, 10);
            let fraisAchat = parseFloat(e.target[2].value);
            let fraisVente =  parseFloat(e.target[3].value);
            let coursAction =  parseFloat(e.target[4].value);

            if (!this.deviseUSD) {
                this.coutTotalAchat = (coursAchatAction*quantite)+fraisAchat;
                this.coutTotalAction = this.coutTotalAchat/quantite;
                this.investissementTotal = quantite*coursAction
                this.investissementTotalApresVente = this.investissementTotal-fraisVente
                this.plusValue = this.investissementTotalApresVente-this.coutTotalAchat

                
                this.value0 = (this.investissementTotalApresVente-(this.plusValue*(0/100)))/quantite
                this.value50 = (this.investissementTotalApresVente-(this.plusValue*(50/100)))/quantite;
                this.value100 = (this.investissementTotalApresVente-this.plusValue)/quantite;

            } else {
                let coursDollar = 1.0536;

                this.coutTotalAchat = ((coursAchatAction)*quantite)+(fraisAchat); //$
                this.coutTotalAction = this.coutTotalAchat/quantite; //$
                this.investissementTotal = quantite*coursAction //$
                this.investissementTotalApresVente = (this.investissementTotal-fraisVente)/coursDollar //€
                this.plusValue = (this.investissementTotalApresVente-this.coutTotalAchat)/coursDollar //€

                this.value0 = ((this.investissementTotalApresVente-(this.plusValue*(0/100)))*coursDollar)/quantite;
                this.value50 = ((this.investissementTotalApresVente-(this.plusValue*(50/100)))*coursDollar)/quantite;
                this.value100 = ((this.investissementTotalApresVente-this.plusValue)*coursDollar)/quantite;
            }
        },

        changeUSD(e){
            console.log(e.target.checked);
            this.deviseUSDCheckbox = e.target.checked
        }
    }
}
</script>