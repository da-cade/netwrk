<template>
  <div class="row">
    <div class="col-12 rounded">
      <div class="bg-secondary p-2 my-2 rounded shadow">
        <div class="d-flex align-items-center">
          <div class="toProfile p-2">
            <img class="profile-img object-fit rounded-circle" :src="post.creator.picture" @click.stop="goToProfile()" alt="">
          </div>
          <div class="m-3 p-2">
            <h6>{{post.creator.name}}</h6>
            <div class="d-flex">
              <p class="m-0">posted timeago</p>
              <i v-if="post.creator.graduated" class="mdi mdi-school"></i> 
              <!-- if they're a student?/ -->
              <!-- <div v-if="account.id == profile.id"> -->
                <!-- //TODO make a dropdown list -->
                dropdown
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="px-4 mt-3 mx-2">
            <p class="m-0 p-1">{{post.body}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-end mt-2">
            <i class="choosem m-0 p-0">❤</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute, useRouter } from "vue-router"
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props){
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      // profile: computed(() => AppState.activeProfile),
      goToProfile(){
        router.push({ name: 'ProfilePage', params: { id: props.post.creatorId} })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  i{
    height: 1.5rem;
  }
  i:hover{
    cursor: pointer;
  }
  .profile-img{
    height: 10vh;
    width: 10vh;
    object-fit: cover;
  }
  .toProfile:hover{
    cursor: pointer;
  }
  
</style>