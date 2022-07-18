<template lang="">
    <div>
      <Bar :chart-data="chartData" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import testData from '../../datas.json'

export default {
    components: {
        Bar
    },
    props:['datas'],
  data() {
    return {
      data: this.datas,
      testData,
    }
    
  },
  computed:{
    chartData() { 
      let label = [];
      let datasTable = [];
      for(let x in this.data){
        label.push(x);
        for( let y in this.data[x]){
          datasTable.push(parseFloat(this.data[x]["4. close"]));
          console.log(this.data[x]["4. close"]);
        }
      }
      console.log(label);
      console.log(datasTable);
      return {
        labels: label,
        datasets: datasTable
      } 
    },
  },
  mounted() {
    console.log(this.data);
  },
}
</script>
<style lang="">
    
</style>