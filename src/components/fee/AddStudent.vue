<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from "axios"

import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';

import { studentManage } from '@/stores/studentStore/studentManage.js'

//define folder student , filter and state
const student_Manage=studentManage();

//define toast for displaying message
const toast = useToast();

//define student class and other variable
const class_collection=ref([
    {className:'1',classValue:'1'},
    {className:'2',classValue:'2'},
    {className:'3',classValue:'3'},
    {className:'4',classValue:'4'},
    {className:'5',classValue:'5'},
    {className:'6',classValue:'6'}, 
    {className:'7',classValue:'7'}, 
    {className:'8',classValue:'8'}, 
    {className:'9',classValue:'9'}, 
    {className:'10',classValue:'10'}, 
    {className:'11',classValue:'11'}, 
    {className:'12',classValue:'12'},         
    {className:'Custom',classValue:'Custom'}, 
])

const studentName=ref(null);
const fee=ref(null);
const selected_class=ref(null);
const start_date=ref(null);

//define status to show or hide modal add student
const visible=ref(false);

const popoverVisisible=ref(false);

const humanreadable_fee_add=ref(null);

//define function

function openModal()
{
    visible.value=true;
    resetModal()
}

function resetModal()
{
  studentName.value=null;
  fee.value=null;
  selected_class.value=null;
  start_date.value=null;
  humanreadable_fee_add.value=null;
}

function toggleHelp()
{
  if(popoverVisisible.value==false)
  {
    popoverVisisible.value=true;
  }
  else
  {
    popoverVisisible.value=false;
  }
}

async function addStudent()
{    
  if(studentName.value==null || fee.value==null || selected_class.value==null || start_date.value==null)
  {
    toast.add({
      severity: 'warn',
      summary: 'Info',
      detail: 'Please enter information',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });       
      return ;
  }
    await axios.post('api/addstudent',{
        studentName: studentName.value,
        selected_class: selected_class.value.classValue,
        start_date: start_date.value.toLocaleDateString('en-CA',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }),
        fee: fee.value,

    })
  .then(function (response) {
    if(response.data.success==true)
    {
      student_Manage.update_selected_folder('Active');       
      student_Manage.get_student_list('Active');
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: 'Add student successfully',
        life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });       
      visible.value=false;
      resetModal();
    }
            
  })
  .catch(function (error) {
    console.log(error);
  });
}

//track selected folder for fetching the student list
watch(() => student_Manage.selected_folder_status, (newValue) => {  
  student_Manage.get_student_list(newValue);
  
})

function auto_format_addfee()
{
  humanreadable_fee_add.value=(Number(fee.value).toLocaleString('en-US'));
}

</script>

<template>
  <div class="add-filter-student-area">
    <button @click="openModal" class="btn btn-primary btn-open-modal-add-student"><i class="fas fa-plus"></i> Add student</button>    
    <div class="folder-student-area">        
        <Dropdown v-model="student_Manage.selected_folder" :options="student_Manage.student_folder" optionLabel="statusName" placeholder="Active"  class="w-full md:w-5rem folder_list" />
        <button type="button" class="btn question-cirle-help" @click="toggleHelp">
          <i class="fas fa-question-circle"></i>
        </button>
    </div>
    
  </div>
<Dialog v-model:visible="popoverVisisible" modal header="Student Folder Define">
<p>Active: Students are currently enrolled.</p>
<p>Debt: Students have stopped attending classes and have unpaid fees.</p>
<p>Closed: Students have withdrawn from the class.</p>
</Dialog>  
<Dialog v-model:visible="visible" modal header="Add Student" style="width:30%">
    <form @submit.prevent="addStudent">
  <div class="form-group">
    <label for="studentName">Student Name</label>
    <InputText type="text" style="width:100%" v-model="studentName" /> 
  </div>
  <div class="form-group">
    <label for="startDate">Fee | {{ humanreadable_fee_add }}</label>
    <br>
    <InputText type="number" style="width:100%" v-model="fee" @keyup="auto_format_addfee" />
  </div>
  <div class="form-group">
    <label for="studentClass">Class</label>
    <br>
    <Dropdown v-model="selected_class" :options="class_collection" optionLabel="className"  placeholder="Select a class"  class="w-full md:w-14rem"  style="width:50%"/>
  </div>
  <div class="form-group">
    <label for="startDate">Start Date</label>
    <br>
    <Calendar style="width:50%" v-model="start_date" dateFormat="dd/mm/yy" showIcon iconDisplay="input" showButtonBar/>
  </div>
  
    <button type="submit" class="btn btn-primary">Save</button>    
    </form>
</Dialog>

</template>

<style>
.btn-open-modal-add-student
{
  margin-bottom: 10px;
}
.btn-open-modal-add-student i
{
  margin-right:5px;
}
.add-filter-student-area
{
  width:100%;
  display:flex;
  justify-content: space-between;
  margin-bottom:15px;
}
.add-filter-student-area .folder_list
{
  display:flex;
  align-items: center;
}
.folder-student-area
{
  display: flex;
}
.question-cirle-help
{
  font-size: 20px;
}
</style>