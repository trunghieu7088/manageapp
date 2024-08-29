<script setup>


</script>
<template>
<div class="col-lg-6">

            <div class="card card-primary card-outline">
              <div class="card-body">
                <h5 class="card-title">Managing Student</h5>

                <p class="card-text custom-text-mg">
                  You can add, edit or remove students by using the below links.
                </p>
                <RouterLink activeClass="active" to="/students" class="card-link">
                  Student List         
                </RouterLink>      

                <RouterLink activeClass="active" to="/reports" class="card-link">
                  Reports      
                </RouterLink> 
             
              </div>
            </div>
            
</div>
</template>
<style>
.custom-text-mg
{
  margin-top:30px;
}
</style>