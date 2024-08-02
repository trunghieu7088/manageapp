<script setup>
import { ref,computed } from 'vue'
import { RouterLink } from 'vue-router'
import OverlayPanel from 'primevue/overlaypanel';

import { studentManage } from '@/stores/studentStore/studentManage.js'
import { useToast } from 'primevue/usetoast';

//define toast for displaying message
const toast = useToast();

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
            Fee                             
          </RouterLink> 
          <button @click="toggleOverlay($event)" class="btn bg-info btn-move-student"><i class="fas fa-folder-open"></i> Move</button>
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