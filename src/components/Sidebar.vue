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
        <p v-show="myProfile.class" class="m-0">{{myProfile.class}}</p>
        <h5>{{myProfile.name}}</h5>   
      </div>
      <div class="d-flex flex-column my-2">
        <a v-show="myProfile.github" target="blank" :href="myProfile.github"><i class="mdi mdi-github me-2"></i>github</a>
        <a v-show="myProfile.resume" target="blank" :href="myProfile.resume"><i class="mdi mdi-account-circle me-2"></i>resume</a>
        <a v-show="myProfile.linkedin" target="blank" :href="myProfile.linkedin"><i class="mdi mdi-linkedin me-2"></i>linkedIn</a>
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
  top: -2rem;
  right: 2.7rem;
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
    @media screen and (min-width: 750px) {
    .sidebar {
      display: none;
    }
  }
</style>