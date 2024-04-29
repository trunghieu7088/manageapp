<script setup>
import axios from "axios"
function showclick(event)
{
  console.log(event.target.getAttribute('data-attribute'));
}

function testtime()
{
   axios.get('api/testcarbon').then((response) =>{
      console.log(response.data.return_data);
    });
}
</script>
<template>
<div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>                
                <p class="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's
                  content.
                </p>

                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>

            <div class="card card-primary card-outline">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>

                <p class="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's
                  content.
                </p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div><!-- /.card -->

            <button class="btn btn-danger ml-3" data-attribute="test1" @click="showclick">Click 1</button>
            <button class="btn btn-danger ml-3" data-attribute="test2" @click="showclick">Click 2</button>
            <button class="btn btn-danger ml-3" data-attribute="test3" @click="showclick">Click 3</button>

            <br>
            <button class="btn btn-info mt-3" @click="testtime">Test time</button>
</div>
</template>
