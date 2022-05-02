<template>
    <div class="col-12">
      <div class="row">
        <div class="col">
          <div class="profile">
            <div class="banner rounded-top" :style="{'background-image':`url(${state.activeProfile.coverImg})`}">
            </div>
            <div class="d-flex align-items-center" style="position: relative; min-height: 100%;">

              <img class="profile-img rounded-circle hover" data-bs-toggle="modal" data-bs-target='#edit-profile-modal' :src="state.activeProfile.picture" alt="" v-if="state.activeProfile.id === myProfile.id">
              <img class="profile-img rounded-circle hover" :src="state.activeProfile.picture" alt="" v-else>
              <!-- position relative float -->
            </div>
            <div class="d-flex justify-content-end">
              <i v-if="state.activeProfile.graduated" class="mdi mdi-school align-self-end" ></i>
              <div>
                <a v-if="state.activeProfile.github" target="blank" :href="state.activeProfile.github"><i class="mdi mdi-github me-2"></i></a>
                <a v-if="state.activeProfile.resume" target="blank" :href="state.activeProfile.resume"><i class="mdi mdi-account-circle me-2"></i></a>
                <a v-if="state.activeProfile.linkedin" target="blank" :href="state.activeProfile.linkedin"><i class="mdi mdi-linkedin me-2"></i></a>
              </div>
            </div>
            <div class="profile-info d-flex flex-column justify-content-end">
              <div class="">
                <div>
                  <h5>{{state.activeProfile.class}}</h5>
                  <h3>{{state.activeProfile.name}}</h3>
                </div>
              </div>
              <div class="row">
                <div>
                  <p>{{state.activeProfile.bio}}</p>
                </div>
              </div>
              <div class="row">
                <div v-if="state.activeProfile.id === myProfile.id"> 
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-profile-modal">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
          <Post v-for="p in state.posts" :key="p.id" :post="p"/>
        </div>
      </div>
      <div class="row">
        <Pagination />
      </div>
    </div>
      
  <Modal id="edit-profile-modal" >
    <template #modal-slot>
      <div class="p-3 modal-dimensions">
      <ProfileForm />
      </div>
    </template>

  </Modal>
  <!-- <Modal id="expand-image-modal" >
    <template  #modal-title-slot>
    </template>
    <template #modal-body-slot>
      <div class="">
        <img :src="state.activeProfile.picture" alt="">
      </div>
    </template>
  </Modal> -->
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profilesService } from "../services/ProfilesService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { postsService } from "../services/PostsService"
export default {
  setup(){
    const state = reactive({
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.searchResults),
    })
    const route = useRoute()
    onMounted( async () => {
      try {
        await profilesService.getProfile(route.params.id)
        await postsService.getByQuery({ creatorId: route.params.id })
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      myProfile: computed(() => AppState.myProfile),
      pageData: computed(() => AppState.pageData),
      state,
      count: 1,
      async newer(){
      try {
        AppState.posts = []
        this.count--
        await postsService.getByPage(route.params.id, this.count)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    async older(){
      try {
        AppState.posts = []
        this.count++
        console.log(this.count)
        await postsService.getByPage(route.params.id, this.count)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    }
  }
}
</script>


<style lang="scss" scoped>
  .modal-dimensions{
    min-height: 40vh;
  }
 .full-height{
   min-height: 100vh;
 }
 .profile{
   min-height: 30vh;
 }
 .profile-img{
   position: absolute;
   
 }
 .profile-info{
   margin-top: 5rem;
   padding: 2rem;
 }

</style>