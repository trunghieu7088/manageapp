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