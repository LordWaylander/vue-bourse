<template lang="">
    <div>
      <Bar :chart-data="DatasGraphique" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
    components: {
        Bar
    },
    props:{
      datas: {
        type: Object,
        default: {}
      }
    },
  data() {
    return {
    }
  },
  computed:{
    DatasGraphique() { 
      let label = [];
      let datasTable = [];
      let tableDates = []

      for(let x in this.datas){
        label.push(x);
        for( let y in this.datas[x]){
          if(y == "4. close"){
            datasTable.push(parseFloat(this.datas[x][y]));
          }
        }
      }

      label = label.reverse()
      label.forEach(element => {
        let table = element.split(' ');
        tableDates.push(table[0].split('-').reverse().join("/")+' à '+table[1])
      });
      datasTable.reverse();

      return {
        labels: tableDates,
        datasets: [{data: datasTable}]
      } 
    },
  },
  mounted() {
    console.log(this.datas);
  },
}
</script>

<style lang="scss">
    
</style>