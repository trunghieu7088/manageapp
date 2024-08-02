import { ref , computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"


export const studentManage = defineStore('studentManage', () => {

    //define selected_folder is Active by default
    const selected_folder = ref({ statusName: 'Active', statusValue: 'Active' });

    const selected_folder_status = computed(() => {
        return selected_folder.value.statusValue;
      });

    const student_list=ref(null);

    const temp_student_list=ref(null);

    const student_folder=ref([
        {statusName:'Active',statusValue:'Active'},
        {statusName:'Closed',statusValue:'Closed'},
        {statusName:'Debt',statusValue:'Debt'},
      ])
      
    function update_selected_folder(status)
    {
        selected_folder.value = {
            statusName: status,
            statusValue: status
          };
    }

    async function move_student(id,folder)
    {
      const update_folder={status_record: folder};
      const move_student_response=await axios.put('api/movestudent/'+id,update_folder).then((response) =>{
                     
    }).catch(error => {
            console.error("Error fetching student list:", error);
        })
    }

    async function get_student_list(status_record='Active')
    {
      
      await axios.get('api/getallstudent/'+status_record).then((response) =>{
            student_list.value=response.data;  
            temp_student_list.value=response.data;                       
        }).catch(error => {
                console.error("Error fetching student list:", error);
            })
            return temp_student_list;
    }
    return { selected_folder , student_folder, selected_folder_status, get_student_list, update_selected_folder, student_list, move_student }
})
