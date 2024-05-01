<script setup>
import { ref } from 'vue'
import axios from "axios"

import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';

const visible=ref(false);
const toast = useToast();

const class_collection=ref([
    {className:'1',classValue:'1'},
    {className:'2',classValue:'2'},
    {className:'3',classValue:'3'},
    {className:'4',classValue:'4'},
    {className:'5',classValue:'5'},
    {className:'6',classValue:'5'}, 
    {className:'Toeic Class',classValue:'Toeic'}, 
])

const studentName=ref(null);
const fee=ref(null);
const selected_class=ref(null);
const start_date=ref(null);

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

    console.log(start_date.value.toLocaleDateString('en-CA',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }));  
    console.log(start_date.value); 
    console.log(selected_class.value.classValue);
}
</script>

<template>
<button @click="openModal" class="btn btn-danger">Open Modal</button>
<Dialog v-model:visible="visible" modal header="Add Student" style="width:30%">
    <form @submit.prevent="addStudent">
  <div class="form-group">
    <label for="studentName">Student Name</label>
    <InputText type="text" style="width:100%" v-model="studentName" /> 
  </div>
  <div class="form-group">
    <label for="startDate">Fee</label>
    <br>
    <InputText type="text" style="width:100%" v-model="fee" />
  </div>
  <div class="form-group">
    <label for="studentClass">Class</label>
    <br>
    <Dropdown v-model="selected_class" :options="class_collection" optionLabel="className" placeholder="Select a class"  class="w-full md:w-14rem"  style="width:50%"/>
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