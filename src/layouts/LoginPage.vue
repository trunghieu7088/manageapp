<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { userData } from '@/stores/authStore/authStore.js'
import ProgressSpinner from 'primevue/progressspinner';

const authUser= userData();

const email=ref(null);
const password=ref(null);


 function dologin()
{
   authUser.login(email.value,password.value);
}

onMounted(async()=>{
    document.querySelector("body").classList.add('hold-transition'); 
    document.querySelector("body").classList.add('login-page');          
    document.querySelector("body").style="min-height:800px;";
});

onUnmounted(async()=>{
  
  document.querySelector("body").classList.remove('hold-transition'); 
      document.querySelector("body").classList.remove('login-page');      
      document.querySelector("body").style="min-height:800px;";
});

</script>
<template>    

  <div class="login-box">      
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    
    <div class="card-header text-center">      
      <RouterLink to="/" class="h1">
        <b>Bo Meo</b> App
      </RouterLink>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form id="login" @submit.prevent="dologin">
        <div class="input-group mb-3">
          <input type="text" v-model="email" class="form-control" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" v-model="password" class="form-control" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
          
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>                                                           
          </div>
          <!-- /.col -->
        </div>
      </form>

     
      <!-- /.social-auth-links -->

    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>

</template>