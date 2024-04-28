 <script setup>
 import { userData } from '@/stores/authStore/authStore.js'

const authUser= userData();

</script>
 <template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>

      <li>
        <a @click="authUser.logout()" class="nav-link"  href="#">Logout</a>
      </li>
    
    </ul>
  </nav>
  </template>