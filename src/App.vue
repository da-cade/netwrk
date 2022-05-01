<template>
  <main>
    <Navbar />
    <div class="full-page container">
      <div class="full-page row">
        <div class="col-md-2">
          <Sidebar v-if="myProfile.id"/>
        </div>
        <router-view />
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
</style>
