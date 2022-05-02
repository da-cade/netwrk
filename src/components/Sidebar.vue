<template>
  <div class="sidebar">
    <div class="ms-5 d-flex flex-column mw-100">
      <div class="mt-5 d-flex align-items-center profile-img">
        <router-link :to="{ name: 'ProfilePage', params: { id: myProfile.id }}">
        <img class="profile-img rounded-circle hover" :src="myProfile.picture" alt="">
        </router-link>
        <div class="grad-icon">
          <i v-if="myProfile.graduated" class="mdi mdi-school"></i>
        </div>
      </div>
      <div class="info my-3 mw-100">
        <p class="m-0">{{myProfile.class}}</p>
        <span>{{myProfile.name}}</span>   
      </div>
      <div class="d-flex flex-column my-2">
        
          <!-- TODO -->
          <router-link :to="myProfile.github">
            <i class="mdi mdi-github"></i><span>Github</span>
          </router-link>
          <router-link :to="myProfile.resume">
            <i class="mdi mdi-account-circle"></i><span>Resume</span>
          </router-link>
          <router-link :to="myProfile.linkedin">
            <i class="mdi mdi-linkedin"></i><span>LinkedIn</span>
          </router-link>
        
      </div>
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
}
.grad-icon{
  position: absolute;
  bottom: 0rem;
  right: 1rem;
  font-size: 32px;
}
 .hover{
    cursor: pointer;
  }
  .info{
    overflow-wrap: anywhere;
  }
  .sidebar{
    min-height: 100%;
    background-color: rgba(172, 255, 47, 0.452);
  }
</style>