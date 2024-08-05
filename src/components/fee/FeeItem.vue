<script setup>
import { ref,computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { studentManage } from '@/stores/studentStore/studentManage.js'
import axios from "axios"
import { useConfirm } from "primevue/useconfirm";

//define toast for displaying message
const toast = useToast();

const custom_confirm=useConfirm();

const student_Manage=studentManage();

const props = defineProps({
    id: Number,      
    id_student: Number,  
    fee_value: Number,

    start_date: String,    
    start_date_formatted: String,

    end_date: String,    
    end_date_formatted: String,

    state:String,
    need_pay:Boolean,

  })

  const emit = defineEmits(['refresh-fee-list'])

  async function updateFeeStatus(id_fee)
  {
    const update_status_result= await student_Manage.updateFeeStatus(id_fee);
    if(update_status_result==true)
    {
      emit('refresh-fee-list',props.id_student);
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: 'updated successfully',
        life: 4000 // Optional: Duration in milliseconds (default: 3000)
      });     
    } 
    
  }

  function call_delete_confirm()
  {
    custom_confirm.require({
        message: 'Are you sure you want to delete this month?',
        header: 'Delete Month',
        icon: 'icon-delete',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',       
        accept: () => {
            // Your delete logic here            
            delete_month();
        },
    });
  }
  async function delete_month()
  {
     await axios.delete('api/deletemonth/'+props.id)
     .then((response) =>
        {                   
          if(response.status==200)
          {
            emit('refresh-fee-list',props.id_student);
            toast.add({
              severity: 'success',
              summary: 'Info',
              detail: 'deleted successfully',
              life: 4000 // Optional: Duration in milliseconds (default: 3000)
            });     
          }
        })
        .catch(error => {
                console.error("Error deleting month", error);
            })                        
  }

  const formatted_fee=computed(()=>{    
    return props.fee_value.toLocaleString();             
  })

  const mark_btn_label=computed(()=>{    
    if(props.state=='debt')
        return '<i class="far fa-check-circle"></i> Mark paid'
    else
        return '<i class="fas fa-history"></i> Mark unpaid'
  })  

  const highlight_label=computed(()=>{    
    if(props.need_pay==true)
        return 'unpaid_class' 
     if(props.state=='paid')     
        return 'paid_class'
  })  
  

</script>
<template>
    <tr :class="highlight_label">
        <td>{{ start_date_formatted }}</td>
        <td>{{ end_date_formatted }}</td>
        <td>{{ formatted_fee }}</td>        
        <td>
            <button class="btn btn-info btn-mark" @click="updateFeeStatus(id)" v-html="mark_btn_label">                                
            </button>
            <button v-if="props.state!='paid'" class="btn btn-danger btn-delete-month" @click="call_delete_confirm"><i class="fas fa-trash"></i> Delete</button>
        </td>
    </tr>
</template>
<style>
.btn-mark i
{
    font-size:18px !important; 
}
.btn-mark
{
  margin-right:10px;
}
.btn-delete-month i
{
  font-size:18px !important;
}
</style>