<template lang="">
    <div>
      <Bar 
        :chart-data="DatasGraphique" 
        :chart-options="OptionsGraphique"
      />
    </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, LineController, PointElement, BarElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, LineController, PointElement, BarElement)


export default {
    components: {
        Bar,
        Line
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
          type: 'line',
          backgroundColor: 'rgb(21, 180, 219)',
          borderColor: 'rgb(21, 0, 219)',
          data: datasTable
        }]
      } 
    },
    OptionsGraphique() {
      return {
        responsive: true,  
        scales: {
          xAxis: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            },   
            ticks: {
              beginAtZero: false,
              padding: 0,
              minRotation: 90
            }      
          },
          y: {
            display: true,
            title : {
              display: true,
              text: 'cours'
            },
            ticks: {
              minRotation: 30,
              maxTicksLimit: 20,
            },
            grid: {
              display: true,
            },
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