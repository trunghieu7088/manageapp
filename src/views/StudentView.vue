<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from "axios"
import Skeleton from 'primevue/skeleton';
import AddStudent from '@/components/fee/AddStudent.vue'
import StudentItem from '@/components/fee/StudentItem.vue'
import { studentManage } from '@/stores/studentStore/studentManage.js'

const is_fetch_done=ref(false);
const is_loading_state=ref(true);
const student_Manage=studentManage();

const student_collection=ref(null);

const fetchStudents = async () => {
  student_collection.value= await student_Manage.get_student_list(student_Manage.selected_folder_status)  
  if(student_Manage.student_list.success==true)
  {
    is_fetch_done.value=true;
    is_loading_state.value=false;    
  }     
}

const summary_loader=ref(true);

const summary_info=ref({
        revenue:0,  
        income:0, 
        overdue_payments:0,
        total_students:0,
        active_students:0,
        debt_students:0,
        closed_students:0,

});

async function get_finance_summary()
{
  
  await axios.get('api/getsummary').then((response) =>{
    
        summary_loader.value=true;
            Object.keys(response.data).forEach(key => {
                if (summary_info.value.hasOwnProperty(key)) {
                  summary_info.value[key] = response.data[key];
                }
               
          });
          summary_info.value.income= (Number(summary_info.value.income)).toLocaleString();
          summary_info.value.revenue= (Number(summary_info.value.revenue)).toLocaleString();
          summary_info.value.overdue_payments= (Number(summary_info.value.overdue_payments)).toLocaleString();
  
          summary_loader.value=false;         
        }).catch(error => {
                console.error("Error fetching student list:", error);
            })
}

onMounted(() => {
  fetchStudents();
  get_finance_summary();
})  

watch(() => student_Manage.student_list, (newValue) => {   
  get_finance_summary();  
})

</script>
<template>       
      <div class="col-12 col-lg-12 col-md-12 col-sm-12" v-if="summary_loader">
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>        
      </div>
      <div class="col-lg-3 col-6" v-if="summary_loader==false">            
            <div class="small-box bg-info">
              <div class="inner">
                <h4><i class="fas fa-user"></i>  {{summary_info.total_students}} Students</h4>
                <p class="detail-infor-student">                  
                  <span>Active: {{summary_info.active_students}}</span>
                  <span>Debt: {{summary_info.debt_students}}</span>
                  <span>Closed: {{summary_info.closed_students}}</span>
                </p>              
              </div>                
            </div>
      </div>

      <div class="col-lg-3 col-6"  v-if="summary_loader==false">            
            <div class="small-box bg-success">
              <div class="inner">
                <h4><i class="fas fa-coins"></i> {{summary_info.income}}</h4>
                <p class="detail-infor-student">                  
                  <span>Income per month</span>                
                </p>      
              </div>                         
            </div>
      </div>

      <div class="col-lg-3 col-6"  v-if="summary_loader==false">            
            <div class="small-box bg-revenue">
              <div class="inner">
                <h4><i class="fas fa-award"></i> {{summary_info.revenue}}</h4>
                <p class="detail-infor-student">                  
                  <span>Revenue since 2022</span>                
                </p>      
              </div>                         
            </div>
      </div>

      <div class="col-lg-3 col-6"  v-if="summary_loader==false">            
            <div class="small-box bg-warning">
              <div class="inner">
                <h4><i class="fas fa-hand-holding-usd"></i> {{summary_info.overdue_payments}}</h4>
                <p class="detail-infor-student">                  
                  <span>Overdue payments</span>                
                </p>      
              </div>                         
            </div>
      </div>

    <AddStudent></AddStudent>        
    <div class="col-lg-12 col-md-12 col-sm-12" v-if="is_loading_state">
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
    </div>
    <div class="table-responsive" v-if="is_fetch_done">
    <table class="table table-striped table-bordered text-center">
        <thead class="thead-dark">
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">Class</th>
            <th scope="col">Fee</th>
            <th scope="col">Unpaid month</th>
            <th scope="col">Action</th>
            </tr>            
        </thead>
       <tbody>         
          <StudentItem v-for="studentItem in student_Manage.student_list.return_data" v-bind="studentItem"></StudentItem>
       </tbody>
    </table>
  </div>        
</template>

<style>
.table
{
    font-size:18px;
}
.table i
{
  font-size:20px;
}
.detail-infor-student
{
  display:flex;
  justify-content: space-between;   
  padding-right:20px;
}
.detail-infor-student span
{
  margin-top:10px;
  
  font-size:18px !important;
}
.bg-revenue
{
  background: #10a2ef;
  color: #ffffff;
}
</style>