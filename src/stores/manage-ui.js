import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const manageUIStore = defineStore('manageUIStore', () => {
  const overlay_sidebar = ref(false);

  function switch_overlay_sidebar()
  {
    if( overlay_sidebar.value==true)
    {
        overlay_sidebar.value=false;
        document.querySelector("body").classList.remove('sidebar-open');    
        document.querySelector("body").classList.remove('layout-fixed');
        document.querySelector("body").classList.add('sidebar-mini'); 
    }
    else
    {
        overlay_sidebar.value=true;
        document.querySelector("body").classList.add('sidebar-open');    
        document.querySelector("body").classList.add('layout-fixed');
        document.querySelector("body").classList.add('sidebar-mini'); 
    }
   
  }

  return { overlay_sidebar, switch_overlay_sidebar }
})
