<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from "axios"
import Chart from 'primevue/chart'
import Skeleton from 'primevue/skeleton';

const is_load_done=ref(false);

const chart_data_set=ref([]);

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function get_report()
{
  
  await axios.get('api/getreport').then((response) =>{
                
                const report_list =response.data.report;
                
                /* Object.keys(report_list).forEach(function(key, index) {
                    console.log(report_list[key]);                                        
                });*/
                
                //get years
                const years_list = Object.keys(report_list);               
                
                //add manually data for 2022 & 2023 because there is no data
                chart_data_set.value.push(
                        {
                            label: '2022',
                            backgroundColor: 'rgb( 229, 87, 29 )',
                            borderColor: 'rgb( 229, 87, 29 )',
                            borderWidth: 1,
                            data: [4100000, 6700000, 8500000, 11200000, 8000000, 7200000, 10050000,8600000, 11600000,14300000,13700000,14000000]  
                        }
                     )          
                chart_data_set.value.push(
                        {
                            label: '2023',
                            backgroundColor: 'rgb(144, 229, 29)',
                            borderColor: 'rgb(144, 229, 29)',
                            borderWidth: 1,
                            data: [3900000, 12100000, 16200000, 14000000, 7700000, 11150000, 13500000, 10500000, 14300000, 14300000,15800000, 13200000]  
                        }
                     )          
                //end adding      
                years_list.forEach((element, index) => 
                {                    
                    let random_color=getRandomColor();
                     chart_data_set.value.push(
                        {
                            label: element,
                            backgroundColor: random_color,
                            borderColor: random_color,
                            borderWidth: 1,
                            data: Object.values(report_list[element]),
                        }
                     )             
                    
                });

                is_load_done.value=true;
              
        }).catch(error => {
                console.error("Error fetching student list:", error);
            })
}

onMounted(() => {  
  get_report();
})  

const chart_data=ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: chart_data_set.value,
});

</script>

<template>
    <div class="col-12 col-md-12 col-sm-12 col-lg-12" v-if="is_load_done==false">
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>   
        <Skeleton  height="2rem" class="mb-2"></Skeleton>   
    </div>
    <div class="chart-report-area col-12 col-md-12 col-sm-12 col-lg-12" v-if="is_load_done">
        <p>Income by years</p>
        <Chart type="line" :data="chart_data"  class="h-25rem" />
    </div>

</template>

<style>
.chart-report-area
{
    margin-bottom:30px;
}
</style>