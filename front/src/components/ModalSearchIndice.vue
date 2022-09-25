<template lang="">
     <div id="opacityCorps">
        <div id="modalBackground" v-if="error === false">
            <div id="close" @click="closeModal"><img src="../assets/cross_close.png"/></div>
            <div v-if="research.length > 0" id="modalCorps">
                <div v-for="element in research">
                    <div id="modalElement" @click="requeteAPI(element['1. symbol'])">
                        <p>Nom : {{element["2. name"]}}</p>
                        <p>Région : {{element["4. region"]}}</p>
                        <p>Devise : {{element["8. currency"]}}</p>
                    </div>
                </div>
            </div>
            <div v-else id="empty">
                Aucune correspondance trouvée !
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['research', 'error'],
    methods: {
        requeteAPI(query){
            this.$emit('requeteAPI', query)
        },
        closeModal(){
            document.getElementById('opacityCorps').style.display='none';
            // emit pour vider la valeur de recherche si on veut y retourner modal -> home -> app
            // pas encore trouvé pour passer de modal -> app directement
            this.$emit('emptyRequestSearch', "")
        }
    },
}
</script>
<style lang="scss" scoped>
    #opacityCorps{
        height: 100vh;
        z-index: 50;
        position: absolute;
        left: 12.5;
        width: 100%;
        background-color: #f0f8ffd9;
        top: 0%;
        display:none;
        #modalBackground{
            background-color: rgba(221, 217, 217, 0.9);
            height: max-content;
            width: 75%;
            z-index: 10;
            position: absolute;
            left: 12.5%;
            top:25%;
            border: 1px solid black;
            border-radius: 5%;
            box-shadow: 1px 5px 10px #007ce8;
            #close{
                display: flex;
                justify-content: end;
                margin-right: 3%;
                margin-top: 1%;
                img{
                    width: 25px;
                    max-width: 3%;
                    cursor: pointer;
                }
            }
            #modalCorps{
                display: flex;
                flex-direction: column;
                margin: 20px;
                #modalElement{
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                    p{
                        margin-right: 2%;
                    }
                }
            }
            #empty{
                text-align: center;
                margin-bottom: 2%;
            }
        }
    }
</style>