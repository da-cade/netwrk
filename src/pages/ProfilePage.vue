<template>
<div class="full-page container-fluid">
  <div class="full-page row">
    <!-- <ProfileBar /> -->
    <div class="col-md-2 bg-secondary"> this will be the profile bar
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class="col-10">
          <div class="m-3">
            <div class="banner rounded-top" :style="{'background-image':`url(${activeProfile.coverImg})`}">
              <i v-if="activeProfile.graduated" class="mdi mdi-school" ></i>
              outline color
            </div>
            <div>
              <img :src="activeProfile.picture" alt="">
              <!-- position relative float -->
            </div>
            <div class="row justify-content-end">
              <div>
                <i>🕶</i>
                <i>🎥</i>
                <i>✌</i>
              </div>
            </div>
            <div class="row">
              <div>
                <h5>{{activeProfile.class}}</h5>
                <h3>{{activeProfile.name}}</h3>
              </div>
            </div>
            <div class="row">
              <div>
                <span>{{activeProfile.bio}}</span>
                <p class="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut veniam quo nihil consequuntur a eos modi et. Placeat eaque voluptatum dolor, eius rem nemo illo, quos molestiae facilis inventore cumque.</p>
              </div>
            </div>
            <div class="row">
              <div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="">Edit Profile</button>
              </div>
            </div>
            <Post v-for="p in posts" :key="p.id" :post="p"/>
          </div>
        </div>
        <div class="col-md-2">
          <div class="bg-secondary full-height">

          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profilesService } from "../services/ProfilesService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { postsService } from "../services/PostsService"
export default {
  setup(){
    const route = useRoute()
    onMounted( async () => {
      try {
        await profilesService.getProfile(route.params.id)
        await postsService.getPostByQuery({ creatorId: route.params.id })
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.searchResults)
    }
  }
}
</script>


<style lang="scss" scoped>
 .full-height{
   min-height: 100vh;
 }
 .banner{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 30vh;
  max-width: auto;
 }
</style>