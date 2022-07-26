<template lang="">
    <div id="containerGraphique">
      <Line class="graphique"
        :chart-data="DatasGraphique" 
        :chart-options="OptionsGraphique"
      />
    </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, LineController, PointElement, BarElement, BarController } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, LineController, PointElement, BarElement, BarController)


export default {
    components: {
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
      let tableDates = [];
      let datasVolumes = [];

      for(let x in this.datas){
        label.push(x);
        for(let y in this.datas[x]){
          if(y == "4. close"){
            datasTable.push(this.datas[x][y]);
          }
          if(y == "5. volume"){
            datasVolumes.push(this.datas[x][y])
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
        datasets: [
          {
            type: 'line',
            label: 'Cours à la fermeture',
            backgroundColor: 'rgb(21, 180, 219)',
            borderColor: 'rgb(21, 0, 219)',
            yAxisID: 'yCours',
            data: datasTable
          },
          {
            type: 'bar',
            label: 'Volumes',
            backgroundColor: 'rgb(21, 180, 219, 0.2)',
            borderColor: 'rgb(21, 0, 219)',
            yAxisID: 'yVolumes',
            data: datasVolumes
          }
        ]
      } 
    },
    OptionsGraphique() {
      return {
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false
          }
        },
        scales: {
          xAxis: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            },  
          },
          yCours:{
            type: 'linear',
            display: true,
            title : {
              display: true,
              text: 'cours'
            },
            ticks: {
              maxTicksLimit: 20,
            },
          },
          yVolumes: {
            type: 'linear',
            display: false,
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
  #containerGraphique {
    position: relative;
    display: flex;
    justify-content: center;
    width:100%;
    .graphique {
      position: relative;
      width: 100%;
      height: 500px;
    }
  }
  
</style>