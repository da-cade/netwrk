<template>
  <main>
    
    <div class="full-page container">
      <div class="full-page row">
        <div class="col-md-2">
            <Sidebar v-if="myProfile.id"/>
        </div>
        <div class="col-md-10 p-0">
          <Navbar />
          <div class="row g-0">
            <div class="col-md-10">
              <router-view />
            </div>
            <div class="col-md-2">
              <FlagHost />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState),
      myProfile: computed(() => AppState.myProfile)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
  main{
    scroll-behavior: smooth;
  }
  .full-page{
    min-height: 100vh;
    max-width: 100vw;
  }
  .hover{
    cursor: pointer;
  }
  .banner{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 30vh;
    max-height: 20vh;
    max-width: auto;
 }
  .profile-img{
    height: 10vh;
    width: 10vh;
    object-fit: cover;
  }
  .object-fit{
    object-fit: cover;
  }
</style>
