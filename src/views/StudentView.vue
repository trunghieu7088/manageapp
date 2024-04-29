<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { userData } from '@/stores/authStore/authStore.js'
import Skeleton from 'primevue/skeleton';
import AddStudent from '@/components/fee/AddStudent.vue'

const turn_off_ske=ref(true);
onMounted(() => {
  console.log('mounted ne');

  });

  function turnoffske()
  {
    turn_off_ske.value=false;
  }

</script>
<template>
    <p>danh sach hoc sinh</p>
    <div class="col-lg-6" v-if="turn_off_ske">
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
        <Skeleton  height="2rem" class="mb-2"></Skeleton>
    </div>

    <button class="btn btn-danger" @click="turnoffske">Turn off</button>
    <AddStudent></AddStudent>
</template>