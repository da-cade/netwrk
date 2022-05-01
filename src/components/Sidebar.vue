<template>
    <div class="mt-5 d-flex flex-column align-items-center">
      <div class="d-flex profile-img">
        <img class="rounded-circle hover" :src="myProfile.picture" alt="">
        <div class="grad-icon">
          <i v-if="myProfile.graduated" class="mdi mdi-school"></i>
        </div>
      </div>
      <div class="my-3">
        <p class="m-0">{{myProfile.class}}</p>
        <h5>{{myProfile.name}}</h5>   
      </div>
      <div class="my-2">
        <ul>
          <!-- TODO -->
          <li>Live Links Optional</li>
          <li>Live Links Optional</li>
          <li>Live Links Optional</li>
        </ul>
      </div>
    </div>
 
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup(){
    return {
      myProfile: computed(() => AppState.myProfile)
    }
  }
}
</script>
  

<style lang="scss" scoped>
.profile-img{
  position: relative;
  max-width: fit-content;
}
.grad-icon{
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  font-size: 32px;
}
 .hover{
    cursor: pointer;
  }
</style>