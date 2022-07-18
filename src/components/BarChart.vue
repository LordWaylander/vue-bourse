<template lang="">
{{data["2022-07-15 20:00:00"]}}
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
    props:{
      datas: Object
    },
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
          if(y == "4. close"){
            datasTable.push(parseFloat(this.data[x][y]));
          }
          
        }
      }
      console.log(label);
      console.log(datasTable);
      return {
        labels: label,
        datasets: [{data: datasTable}]
        //[ { data: [40, 20, 12] } ]
      } 
    },
  },
  mounted() {
    console.log(this.data);
  },
}
</script>

<style lang="scss">
    
</style>