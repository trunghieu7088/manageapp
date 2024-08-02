<script setup>
 import { manageUIStore } from '@/stores/manage-ui.js'

 const overlay_display= manageUIStore();
</script>
<template>
    <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-none d-sm-inline">
      Bo Meo App
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2014-2021 <a href="/homepage">Bo Meo</a>.</strong> All rights reserved.
  </footer>
  <div id="sidebar-overlay" @click="overlay_display.switch_overlay_sidebar()" v-if="overlay_display.overlay_sidebar"></div>
</template>