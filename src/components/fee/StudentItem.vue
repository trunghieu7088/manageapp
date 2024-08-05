<script setup>
import { ref,computed } from 'vue'
import { RouterLink } from 'vue-router'
import OverlayPanel from 'primevue/overlaypanel';

import { studentManage } from '@/stores/studentStore/studentManage.js'
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";


//define toast for displaying message
const toast = useToast();

const custom_confirm=useConfirm();

//define folder student , filter and state
const student_Manage=studentManage();

const props = defineProps({
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

  const classGrade=computed(()=>{
        return props.class;
  })

  const formatted_fee=computed(()=>{
    //return  props.month_fee.toLocaleString('en-US', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 0} );                
    return  props.month_fee.toLocaleString();             
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
</script>
<template>  
    <tr :class="unpaid_class">
        <td>{{ name }}</td>
        <td>{{ start_date_formatted }}</td>
        <td>{{ classGrade }}</td>
        <td>{{ formatted_fee }}</td>
        <td>{{ unpaid_month }}</td>
        <td>
          <RouterLink class="btn bg-primary" :to="'feepage/'+id">
            <i class="fas fa-edit"></i>                                       
          </RouterLink> 
          <button class="btn bg-warning btn-move-student"><i class="fas fa-user-edit"></i></button>
          <button @click="toggleOverlay($event)" class="btn bg-info btn-move-student"><i class="fas fa-folder-open"></i></button>          
          <button @click="call_confirm(id)" class="btn bg-danger btn-move-student"><i class="fas fa-trash"></i></button>
          
        </td>
    </tr>
    <OverlayPanel class="move-area-action" ref="overlayPanel" :dismissable="true">
        <button type="button" @click="move_student(id,'Active')" class="btn btn-info">Active</button>
        <button type="button"  @click="move_student(id,'Debt')" class="btn btn-info">Debt</button>
        <button type="button"  @click="move_student(id,'Closed')" class="btn btn-info">Close</button>
    </OverlayPanel>
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