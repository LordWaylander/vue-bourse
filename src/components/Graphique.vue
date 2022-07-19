<template lang="">
    <div>
      <Bar 
        :chart-data="DatasGraphique" 
        :chart-options="OptionsGraphique"
      />
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
        for(let y in this.datas[x]){
          if(y == "4. close"){
            datasTable.push(this.datas[x][y]);
          }
        }
      }

      label.reverse();
      label.forEach(element => {
        tableDates.push(element.split('-').reverse().join("/"))
      });
      datasTable.reverse();

      return {
        labels: tableDates,
        datasets: [{
          label: 'Cours à la fermeture',
          backgroundColor: 'rgb(21, 180, 219)',
          borderColor: 'rgb(255, 0, 0)',
          data: datasTable
        }]
      } 
    },
    OptionsGraphique() {
        return {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              },   
              ticks: {
                beginAtZero: true,
                padding: 0
              }      
            }
          }
        }
        
      }
  },
  mounted() {
  },
}
</script>

<style lang="scss">

</style>