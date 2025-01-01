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
    const search_keyword = ref(''); // Từ khóa tìm kiếm
    const search_student_list = ref(null);


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

    function searchStudent()
    {
      search_student_list.value = JSON.parse(JSON.stringify(student_list.value));
      if (search_student_list.value && search_student_list.value.return_data) 
          {
          search_student_list.value.return_data = search_student_list.value.return_data.filter(item =>
            item.name.toLowerCase().includes(search_keyword.value.toLowerCase())
          );          
      }
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
           search_student_list.value=response.data;
            
        }).catch(error => {
                console.error("Error fetching student list:", error);                
            })
            return temp_student_list;
    }

    async function delete_student(id_student)
    {      
      let delete_result=false;
      const delete_student_action= await axios.delete('api/deletestudent/'+id_student).then((response) =>
        {                   
          if(response.status==200)
          {
            delete_result=true;
          }
        }).catch(error => {
                console.error("Error deleting student", error);
            })            
            return delete_result;
    }

    async function updateFeeStatus(id_month)
    {
      let update_result=false;
      const update_result_action= await axios.put('api/updatemonthfeestatus/'+id_month).then((response) =>
        {                   
          if(response.status==200)
          {
            update_result=true;
          }
        }).catch(error => {
                console.error("Error deleting student", error);
            })            
            return update_result;
    }


    return { selected_folder ,
       student_folder, selected_folder_status,search_student_list,searchStudent,
       temp_student_list, search_keyword,
        get_student_list, update_selected_folder, 
        student_list, move_student, delete_student, updateFeeStatus }
})
