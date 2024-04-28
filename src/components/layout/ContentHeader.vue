<script setup>
import {useRoute } from 'vue-router'

const dataRoute=useRoute();
</script>
<template>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{dataRoute.meta.title}}</h1>
          </div>
        </div>
      </div>
    </div>
</template>