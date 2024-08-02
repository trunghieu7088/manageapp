import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import axios from "axios"
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';

export const userData = defineStore('userData', () => {
  const info = ref(null)
  const isLogin= ref(null)
  const router=useRouter();
  const toast = useToast();
  const user_display=ref(null);

  const getuserData = computed(() =>{
        return info.value;
  }) 


  function setuserData(userinfo) {
    info.value=userinfo;
    isLogin.value=true;
    user_display.value=userinfo.name;
  }

  function unsetUserData()
  {
    info.value=null;
    isLogin.value=false;    
  }

  async function checkAuth()
  {
    await axios.get('api/getuserinfo').then((response) =>{
      if(response.data.success==true)  
      {      
        setuserData(response.data.return_data);
      }
      else
      {
          unsetUserData()
      }               
    });
  }

  async function logout()
{          
  await axios.post('api/logout')
  .then(function (response) {
    if(response.data.success==true)
    {
      unsetUserData();   

      toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Logged out !!!',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });
       router.push({name:'login'})      
    }
            
  })
  .catch(function (error) {
    console.log(error);
  });
}

async function login(email,password)
{  
  if(email==null || password==null)
  {    
    toast.add({
      severity: 'warn',
      summary: 'Warning!',
      detail: 'Please enter information !',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });
      return false;
  }

  toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'attemping to login',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });

  //due to using sanctum so need to send request to csrf-cookie first
 await axios.get('/sanctum/csrf-cookie');

         
  //after get cookies crsf --> send to authlogin Api
  await axios.post('api/authlogin', {
    email: email,
    password: password,
  })
  .then(function (response) {    
    if(response.data.success==true)
    {    
      setuserData(response.data.return_data); 
      toast.add({
      severity: 'success',
      summary: 'Info',
      detail: 'Login successfully !!',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });

      router.push({ name: 'homepage'});
    }
    else
    {
      toast.add({
      severity: 'error',
      summary: 'Warning!',
      detail: 'The information is not correct !',
      life: 3000 // Optional: Duration in milliseconds (default: 3000)
      });
      return ;
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });  
}


        
  return { userData, getuserData, isLogin, user_display, setuserData , unsetUserData, checkAuth, logout, login}
})
