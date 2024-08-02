<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { userData } from '@/stores/authStore/authStore.js'

const dataRoute=useRoute();
const menu_item_list=ref({
      manageFee: false,
      manageAccount: false,
});

const user_info=userData();

function expandMenu(menuItem)
{
    if(menu_item_list.value[menuItem]==false)
    {
      menu_item_list.value[menuItem]=true
    }
    else
    {
      menu_item_list.value[menuItem]=false
    }    
}


</script>
<template>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="@/assets/admin/imgs/logo-app.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Bo Meo App</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="@/assets/admin/imgs/web_owner.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{user_info.user_display}}</a>
        </div>
      </div>

    
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
         
          <li class="nav-item">
            <RouterLink activeClass="active" to="/homepage" class="nav-link" >
              <i class="nav-icon fas fa-home"></i>              
              <p>Home</p>              
            </RouterLink>         
          </li>

          <li class="nav-item" :class="{'menu-open' : menu_item_list.manageFee || dataRoute.meta.menuParent=='manageFee' }" @click.prevent="expandMenu('manageFee')">
            <a href="#" class="nav-link" :class="{'active': dataRoute.meta.menuParent=='manageFee'}">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Fee Management
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <RouterLink activeClass="active" to="/students" class="nav-link">
                  <i class="nav-icon far fa-circle"></i>
                  <p>Student List</p>              
                </RouterLink>         
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Inactive Page</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item" :class="{'menu-open' : menu_item_list.manageAccount || dataRoute.meta.menuParent=='manageAccount'}" @click.prevent="expandMenu('manageAccount')">
            <a href="#" class="nav-link" :class="{'active': dataRoute.meta.menuParent=='manageAccount'}">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Account Management
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <RouterLink activeClass="active" to="/accounts" class="nav-link">
                  <i class="nav-icon far fa-circle"></i>
                  <p>Account List</p>              
                </RouterLink>         
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Inactive Page</p>
                </a>
              </li>
            </ul>
          </li>


        </ul>
      </nav>
      
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>