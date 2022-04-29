<template>
  <div class="full-page container">
    <div class="full-page row">
      <div class="col-md-2 d-flex flex-column">
        <Navbar />
        <div>
          <img class="rounded-circle" src="" alt="">
        </div>
        <div>
          <p class="m-0">joined timeago</p>
          <h5>Profile name</h5>
        </div>
        <div>
          <ul>
            <li>Live Links Optional</li>
            <li>Live Links Optional</li>
            <li>Live Links Optional</li>
          </ul>
        </div>
      </div>
      <div class="col-md-7">
        <div class="container">
          <Post v-for="p in posts" :key="p.id" :post="p" />
        </div>
      </div>
      <div class="col-md-3">

      </div>
    </div>
  </div>

</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { postsService } from "../services/PostsService"
import { profilesService } from "../services/ProfilesService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup(){
    onMounted( async () => {
      try {
        await postsService.getAllPosts()
        // await profilesService.getProfile()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
  return {
    posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
  .full-page{
    min-height: 100vh;
    max-width: 100vw;
  }
</style>
