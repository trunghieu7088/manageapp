<script setup>
import { ref,computed,onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { studentManage } from '@/stores/studentStore/studentManage.js'
import axios from "axios"
import { useConfirm } from "primevue/useconfirm";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

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
    note: String,
    created_at: String,
    updated_at: String,
    highlight_updated: String,
  })

  const month_fee_value=ref(props.fee_value);

  const humanreadable_month_fee=ref(null);

  const editFeeVisible=ref(false);

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

  function resetEditMonthModal()
  {
    editFeeVisible.value=false;
    month_fee_value.value=props.fee_value;
    auto_format_monthFee();
  }

  function update_fee_month_value()
  {
    resetEditMonthModal();
    editFeeVisible.value=true;
  }

  function auto_format_monthFee()
  {
    humanreadable_month_fee.value=(Number(month_fee_value.value).toLocaleString('en-US'));
  }

  async function submit_update_fee_month_value()
  {    
    if( month_fee_value.value != null && month_fee_value.value != '')
    {
      await axios.put('api/updatemonthfee/'+props.id,{update_fee_value: month_fee_value.value})
      .then((response) =>
          {                   
            if(response.status==200)
            {
              resetEditMonthModal();
              
             emit('refresh-fee-list',props.id_student,props.id);
              toast.add({
                severity: 'success',
                summary: 'Info',
                detail: 'updated fee successfully',
                life: 4000 
              });                 
                          
              
            }
          })
          .catch(error => {
                  console.error("Error deleting month", error);
              })                 
    }
    else
    {
      toast.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Please enter the correct information',
                life: 4000 
              });     
    }
          
  }

  const formatted_fee=computed(()=>{    
    return Number(props.fee_value).toLocaleString();             
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

  const just_updated_class=ref(null);

  onMounted(() => {
    if(props.id==props.highlight_updated)
    {
      just_updated_class.value='just_updated_class';
    }
  })

  function remove_just_updated_highlight()
  {
    just_updated_class.value='';
  }

</script>
<template>
    <tr @mouseover="remove_just_updated_highlight" :class="[highlight_label, just_updated_class]">
        <td>{{ start_date_formatted }}</td>
        <td>{{ end_date_formatted }}</td>
        <td>{{ formatted_fee }}</td>        
        <td>
            <button class="btn btn-info btn-mark" @click="updateFeeStatus(id)" v-html="mark_btn_label">                                
            </button>
            <button  v-if="props.state!='paid'" class="btn btn-warning btn-update-fee-value" @click="update_fee_month_value"><i class="fas fa-edit"></i> Edit</button>
            <button v-if="props.state!='paid'" class="btn btn-danger btn-delete-month" @click="call_delete_confirm"><i class="fas fa-trash"></i> Delete</button>
        </td>
    </tr>
<Dialog v-model:visible="editFeeVisible"  modal header="Update Month Fee">
<form @submit.prevent="submit_update_fee_month_value">
  <div class="form-group">
    <label for="studentName">Month Fee | {{ humanreadable_month_fee }}</label>
    <InputText type="number" style="width:100%" v-model="month_fee_value" @keyup="auto_format_monthFee" /> 
  </div>
  <Button type="submit" label="Submit"></Button>
</form>
</Dialog>
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
.btn-update-fee-value
{
  margin-right:10px;
}
</style>