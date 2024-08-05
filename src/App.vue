<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'


</script>

<template>   
  <RouterView/>
  <ToastMessage></ToastMessage>
  <ConfirmDialogPrime></ConfirmDialogPrime>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback');
</style>