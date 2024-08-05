<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import axios from "axios"
import Skeleton from 'primevue/skeleton';
import FeeItem from '@/components/fee/FeeItem.vue'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { useToast } from 'primevue/usetoast';

//define toast for displaying message
const toast = useToast();

const route = useRoute()
const student_id = route.params.id;
const student_info= ref(null);

const fee_list=ref(null);
const is_fetch_done=ref(false);
const is_loading_state=ref(true);

const start_date=ref(null);
const end_date=ref(null);
const month_fee=ref(null);
const addMonthVisible=ref(false);


onMounted(() => 
  {
    get_student_by_id(student_id);
  });

  function get_student_by_id(student_id)
  {
    is_fetch_done.value=false;
    is_loading_state.value=true;
     axios.get('api/getstudent/'+student_id).then((response) =>{

        student_info.value=response.data.return_data.student;  
        fee_list.value=response.data.return_data.fee_list;          
        is_fetch_done.value=true;
        is_loading_state.value=false;

     }).catch(error => {
            console.error("Error fetching student list:", error);
        })
  }

  function showAddMonthModal()
  {
    addMonthVisible.value=true;
    resetAddMonthForm();
  }

  function resetAddMonthForm()
  {
    start_date.value=null;
    end_date.value=null;
    month_fee.value=null;
  }

  async function addMonthAction()
  {
    if(start_date.value==null || month_fee.value==null || month_fee.value=='' || end_date.value==null ) 
    {
        toast.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Please enter information',
        life: 3000 // Optional: Duration in milliseconds (default: 3000)
        });       
      return ;
    }
    else
    {
        await axios.post('api/addmonth',{
                id_student: student_id,
                start_date: start_date.value.toLocaleDateString('en-CA',{
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                            }),
                end_date: end_date.value.toLocaleDateString('en-CA',{
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                fee_value: month_fee.value,

        }).then(function (response) 
        {
                if(response.status==200)
                {
               
                toast.add({
                    severity: 'success',
                    summary: 'Info',
                    detail: 'Add month successfully',
                    life: 3000 // Optional: Duration in milliseconds (default: 3000)
                });       
                addMonthVisible.value=false;
                resetAddMonthForm();
                get_student_by_id(student_id);
                }
                        
        }).catch(function (error)
        {
                console.log(error);
        });
    }
  }

</script>
<template>       
    <div class="fee-list-area">
        <div class="col-lg-12 col-md-12 col-sm-12" v-if="is_loading_state">
            <Skeleton  height="2rem" class="mb-2"></Skeleton>
            <Skeleton  height="2rem" class="mb-2"></Skeleton>
            <Skeleton  height="2rem" class="mb-2"></Skeleton>
            <Skeleton  height="2rem" class="mb-2"></Skeleton>
        </div>
        <div class="col-lg-12 col-sm-12 col-md-12 student-info-area" v-if="is_fetch_done">
            <RouterLink to="/students" class="back-to-student-link bg-info">                
                <i class="fas fa-arrow-left"></i>
                <span>Student List</span>             
            </RouterLink>       
            <p class="student_name_class">{{ student_info.name }} - Class: {{ student_info.class }}</p>                            
            <button class="btn btn-success" @click="showAddMonthModal"><i class="fas fa-plus"></i> Add month</button>
        </div>

        <div class="col-lg-12 col-sm-12 col-md-12 student-fee-list-area" v-if="is_fetch_done">
            <div class="table-responsive">
                <table class="table table-striped table-bordered text-center">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Fee</th>                            
                            <th scope="col">Action</th>
                        </tr>            
                    </thead>
                    <tbody>         
                        <FeeItem v-for="feeItem in fee_list" @refresh-fee-list="get_student_by_id" v-bind="feeItem"></FeeItem>
                    </tbody>
                </table>
            </div>        
        </div>  

    </div>
<Dialog v-model:visible="addMonthVisible" modal header="Add Month">
    <form @submit.prevent="addMonthAction">
        <div class="form-group">
            <label>Start Date</label>   
            <br>         
            <Calendar v-model="start_date" dateFormat="dd/mm/yy" showIcon iconDisplay="input" showButtonBar/>
        </div>
        <div class="form-group">
            <label>End Date</label>
            <br>
            <Calendar v-model="end_date" dateFormat="dd/mm/yy" showIcon iconDisplay="input" showButtonBar/>
        </div>
        <div class="form-group">
            <label>Month Fee</label>
            <br>
            <InputText type="text" style="width:100%" v-model="month_fee" />
        </div>

        <Button type="submit" label="Submit"></Button>
  
    </form>
</Dialog>  
</template>

<style>
.back-to-student-link
{
    font-size:20px;
    margin-bottom: 15px;
    display: inline-block;   
    padding:10px;

}
.back-to-student-link span
{
    margin-left:5px;
}
.fee-list-area
{    
    padding:5px 15px; 
    width:100%;
}
.student-info-area
{       
    width:100% !important;    
}
.student-info-area p
{
    font-size:20px;
}
.student-fee-list-area
{
    margin-top:10px;
}
.student-fee-list-area table
{
    font-size:18px;
}
.student-fee-list-area table i
{
    font-size:24px;
}
.student_name_class
{
    text-transform: capitalize;    
}
</style>