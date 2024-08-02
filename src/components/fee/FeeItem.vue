<script setup>
import { ref,computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
    id: Number,      
    id_student: Number,  
    fee_value: Number,

    start_date: String,    
    start_date_formatted: String,

    end_date: String,    
    end_date_formatted: String,

    state:String,

  })

  const emit = defineEmits(['refresh-fee-list'])

  function updateFeeStatus(id_fee)
  {
    emit('refresh-fee-list',props.id_student);
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

</script>
<template>
    <tr>
        <td>{{ start_date_formatted }}</td>
        <td>{{ end_date_formatted }}</td>
        <td>{{ formatted_fee }}</td>        
        <td>
            <button class="btn btn-info btn-mark" @click="updateFeeStatus(id)" v-html="mark_btn_label">                                
            </button>
        </td>
    </tr>
</template>
<style>
.btn-mark i
{
    font-size:18px !important;
}
</style>