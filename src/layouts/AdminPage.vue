<script setup>
import NavBar from '../components/layout/NavBar.vue'
import MainSidebar from '../components/layout/MainSidebar.vue'
import ContentHeader from '../components/layout/ContentHeader.vue'
import Footer from '../components/layout/Footer.vue'
</script>

<template>
    <div class="wrapper">
      <NavBar></NavBar>
      <MainSidebar></MainSidebar>
      <div class="content-wrapper">
        <ContentHeader></ContentHeader>

        <div class="content">

          <div class="container-fluid">
            <div class="row">
              
              <RouterView/>
           
            </div>
          </div>    

        </div>
        
      </div>
      <Footer></Footer>
  </div>

</template>

<style>
.unpaid_class
{
  background-color:#f6cdcd !important;
  
}
.paid_class
{  
  background: linear-gradient(109.6deg, rgb(102, 203, 149) 11.2%, rgb(39, 210, 175) 98.7%);
}
.just_updated_class
{
  border:2px solid rgb(39, 210, 175) !important;
}
</style>