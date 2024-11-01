<script setup>
import { ref,computed } from 'vue'
import { RouterLink } from 'vue-router'
import OverlayPanel from 'primevue/overlaypanel';

import { studentManage } from '@/stores/studentStore/studentManage.js'
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import axios from "axios"

//define toast for displaying message
const toast = useToast();

const custom_confirm=useConfirm();

//define folder student , filter and state
const student_Manage=studentManage();

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


const props = defineProps({
    index: Number,
    id: Number,    
    class: String,
    name: String,
    month_fee: Number,
    start_date: String,    
    start_date_formatted: String,
    unpaid_month: Number,
    note: String,
    status_record: String,
    created_at: String,
    updated_at: String,
    full_name_with_class: String,
    student_fee_lists: Array,
  })

  const edit_form_visible=ref(false);
  const edit_student_name=ref(props.name);
  const edit_month_fee=ref(props.month_fee);
  const edit_class=ref(props.class);
  const humanreadable_fee=ref(null);

  const just_updated_class=ref(null);

  const classGrade=computed(()=>{
        return props.class;
  })

  const formatted_fee=computed(()=>{
    //return  props.month_fee.toLocaleString('en-US', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 0} );                
    return  Number(props.month_fee).toLocaleString();             
  })

  const overlayPanel = ref(null);

  const toggleOverlay = (event) => {
      overlayPanel.value.toggle(event);
    };

  const unpaid_class=computed(()=>{    
    return props.unpaid_month > 0 ? 'unpaid_class' : '';
  })

  function move_student(id,folder)
  {
      student_Manage.move_student(id,folder);
      student_Manage.update_selected_folder(folder);
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: 'moved student successfully',
        life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });     
      toggleOverlay();  
  }
  async function delete_student(id_student)
  {
    const delete_result=await student_Manage.delete_student(id_student);        
    if(delete_result==true)
    {     
      student_Manage.update_selected_folder(student_Manage.selected_folder_status);  
      student_Manage.get_student_list(student_Manage.selected_folder_status);
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: 'deleted student successfully',
        life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });     
    }
    
  }

  function call_confirm(id_student)
  {
    custom_confirm.require({
        message: 'Are you sure you want to delete this student?',
        header: 'Delete Student',
        icon: 'icon-delete',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',       
        accept: () => {
            // Your delete logic here            
            delete_student(id_student);
        },
    });
  }
  function openEditForm()
  {
      resetEditStudentForm();
      edit_form_visible.value=true;  
      auto_format_number();
  }

  function auto_format_number()
  {
    humanreadable_fee.value=(Number(edit_month_fee.value).toLocaleString('en-US'));
  }

  function remove_highlight_updated()
  {
    just_updated_class.value='';
  }

  function resetEditStudentForm()
  {
      edit_form_visible.value=false;            
      edit_student_name.value=props.name;
      edit_month_fee.value=props.month_fee;
      edit_class.value=props.class;
      humanreadable_fee.value=null;      
  }
  async function update_student_submit()
  {
    if( edit_student_name.value !='' &&  edit_student_name.value != null 
        && edit_month_fee.value != '' &&  edit_month_fee.value != null 
        && edit_class.value !='' &&  edit_class.value != null 
    )
    {
        await axios.put('api/updatestudent/'+props.id,
                      {
                        edit_name: edit_student_name.value,
                        edit_month_fee: edit_month_fee.value,
                        edit_class: edit_class.value

                      })
      .then((response) =>
          {                   
            if(response.status==200)
            {
              just_updated_class.value='just_updated_class';              
              resetEditStudentForm();
              student_Manage.get_student_list(student_Manage.selected_folder_status);
              toast.add({
                severity: 'success',
                summary: 'Info',
                detail: 'updated student successfully',
                life: 4000 
              });     
            }
          })
          .catch(error => {
                  console.error("Error updating student", error);
              })                 
    }
    else
    {
      toast.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Please enter correct information',
        life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });     
    }
  }
</script>
<template>  
    <tr @mouseover="remove_highlight_updated" :class="[unpaid_class, just_updated_class]">
        <td>{{ index }}</td>
        <td>{{ name }}</td>
        <td>{{ start_date_formatted }}</td>
        <td>{{ classGrade }}</td>
        <td>{{ formatted_fee }}</td>
        <td>{{ unpaid_month }}</td>
        <td>
          <RouterLink class="btn bg-primary" :to="'feepage/'+id">
            <i class="fas fa-edit"></i>                                       
          </RouterLink> 
          <button @click="openEditForm()" class="btn bg-warning btn-move-student"><i class="fas fa-user-edit"></i></button>
          <button @click="toggleOverlay($event)" class="btn bg-info btn-move-student"><i class="fas fa-folder-open"></i></button>          
          <button @click="call_confirm(id)" class="btn bg-danger btn-move-student"><i class="fas fa-trash"></i></button>
          
        </td>
    </tr>
    <OverlayPanel class="move-area-action" ref="overlayPanel" :dismissable="true">
        <button type="button" @click="move_student(id,'Active')" class="btn btn-info">Active</button>
        <button type="button"  @click="move_student(id,'Debt')" class="btn btn-info">Debt</button>
        <button type="button"  @click="move_student(id,'Closed')" class="btn btn-info">Close</button>
    </OverlayPanel>

    <Dialog v-model:visible="edit_form_visible"  modal header="Update Student">
      <form @submit.prevent="update_student_submit">
        <div class="form-group">
          <label for="studentName">Student Name</label>
          <InputText type="text" style="width:100%" v-model="edit_student_name" /> 
        </div>

        <div class="form-group">
          <label>Month Fee | {{ humanreadable_fee }}</label>
          <InputText type="number" style="width:100%" v-model="edit_month_fee" @keyup="auto_format_number"/>            
        </div>
        <div class="form-group">
          <label>Class</label>     
          <br>
          <Dropdown v-model="edit_class" :options="class_collection" optionLabel="className"  optionValue="classValue" :placeholder="edit_class"  class="w-full md:w-14rem"  style="width:50%"/>  
        </div>
        <Button type="submit" label="Save"></Button>
      </form>
    </Dialog>
</template>
<style>
.btn-move-student
{
  margin-left:10px;  
}
.move-area-action
{
  width:300px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
.move-area-action button
{
  margin-left:10px;
}

</style>