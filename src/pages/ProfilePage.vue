<template>
    <div class="col-md-10">
      <div class="row">
        <div class="col-10">
          <div class="profile">
            <div class="banner rounded-top" :style="{'background-image':`url(${activeProfile.coverImg})`}">
              <i v-if="activeProfile.graduated" class="mdi mdi-school" ></i>
              outline color
            </div>
            <div class="d-flex align-items-center" style="position: relative; min-height: 100%;">
              <img class="profile-img rounded-circle hover" data-bs-toggle="modal" data-bs-target="#edit-profile-modal" :src="activeProfile.picture" alt="">
              <!-- position relative float -->
            </div>
            <div class="d-flex justify-content-end">
              <div>
                <i>🕶</i>
                <i>🎥</i>
                <i>✌</i>
              </div>
            </div>
            <div class="profile-info d-flex flex-column justify-content-end">
              <div class="">
                <div>
                  <h5>{{activeProfile.class}}</h5>
                  <h3>{{activeProfile.name}}</h3>
                </div>
              </div>
              <div class="row">
                <div>
                  <p>{{activeProfile.bio}}</p>
                </div>
              </div>
              <div class="row">
                <div>
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-profile-modal" v-if="myProfile.id">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
          <Post v-for="p in posts" :key="p.id" :post="p"/>
        </div>
        <div class="col-md-2">
          <div class="bg-secondary full-height">

          </div>
        </div>
      </div>
    </div>
      
  <Modal id="edit-profile-modal" >
    <template #modal-bg-slot>
       <div class="header-bg" :style="{'background-image':`url(${activeProfile.coverImg})`}"></div>
    </template>
    <template #modal-title-slot>
      <h3>Edit your profile</h3>
    </template>
    <template #modal-body-slot>
      <ProfileForm />
    </template>
  </Modal>
  <Modal id="expand-image-modal" >
    <template  #modal-title-slot>
    </template>
    <template #modal-body-slot>
      <div class="">
        <img :src="activeProfile.picture" alt="">
      </div>
    </template>
  </Modal>
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
        await postsService.getByQuery({ creatorId: route.params.id })
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.searchResults),
      myProfile: computed(() => AppState.myProfile),
      // introduce logic for setting profile on basis of id TODO
    }
  }
}
</script>


<style lang="scss" scoped>

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
  .header-bg{
    background-size: cover;
    background-position-y: 50%;
    height: 35%;
    min-width: auto;
  }
</style>