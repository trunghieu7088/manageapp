 <script setup>
 import { userData } from '@/stores/authStore/authStore.js'

 import { manageUIStore } from '@/stores/manage-ui.js'

const overlay_display= manageUIStore();

const authUser= userData();

</script>
 <template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      
      <li class="nav-item">
        <a @click="overlay_display.switch_overlay_sidebar()" class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>

      <li>
        <a @click.stop="authUser.logout()" href="#" class="nav-link">Logout</a>
      </li>
    
    </ul>
  </nav>
  </template>