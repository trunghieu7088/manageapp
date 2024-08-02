<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
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

onMounted(() => {
  fetchStudents();
})  

</script>
<template>    
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
</style>