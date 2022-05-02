<template>
  <div class="row">
    <div class="col-12">
    
      <div class="d-flex flex-wrap post-bg shadow rounded my-2 p-3"> 
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="toProfile p-2">
              <img class="profile-img hover object-fit rounded-circle" :src="post.creator.picture" @click.stop="goToProfile()" alt="">
            </div>
            <div class="m-3 p-2">
              <h6>{{post.creator.name}}</h6>
              <div class="d-flex">
                <p class="m-0">{{post.createdAt}}</p>
                <i v-if="post.creator.graduated" class="mdi mdi-school"></i> 
                <!-- if they're a student?/ -->
                <!-- <div v-if="account.id == profile.id"> -->
                  <!-- //TODO make a dropdown list -->
                  
                <!-- </div> -->
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="px-4 mt-3 mx-2">
                <p class="m-0 p-1">{{post.body}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="post.imgUrl" class="col-3">
          <div class="post-image">
            <img class="post-image" :src="post.imgUrl" alt="">
          </div>
        </div>
        <div class="col-12 fs-5 d-flex justify-content-end mt-2" v-if="profile.id">
          <p class="">
            {{ post.likeIds.length }}
          </p>
          <div class="" @click="toggleLike()">
            <i v-if="state.liked" class="mdi mdi-heart hover m-0 p-0"></i>
            <i v-if="!state.liked" class="mdi mdi-heart-outline hover m-0 p-0"></i>
            <!-- TODO -->
            <!-- make input a checkbox
            use icon for a check
            check changes a post liked attribute
            if true, add profile.id to ids and profile to likes
            if false, send request again?
            switch between icons accordingly -->
          </div>
          <i v-if="post.creatorId == account.id" class="mdi mdi-delete hover" @click="deletePost()"></i>
          <!-- <input v-model="post.creatorId" type="checkbox" name="liked" id="liked"> -->
        </div>
      </div>
    
    </div>
  </div>
</template>


<script>
import { computed, reactive, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { postsService } from "../services/PostsService"
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props){
    let account = computed(() => AppState.account)
    const state = reactive({
    })
    state.liked = props.post.likeIds.includes(account.id)
    const router = useRouter()
    return {
      account,
      state,
      profile: computed(() => AppState.myProfile),
      account: computed(() => AppState.account),
      // liked: computed(() => {if(props.post.likeIds.includes(profile.id)){}
      //   }),
      goToProfile(){
        router.push({ name: 'ProfilePage', params: { id: props.post.creatorId} })
      },
      async toggleLike(){
        state.liked = !state.liked
        try {
          const likeList = await postsService.toggleLike(this.profile, props.post)

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async deletePost(){
        try {
          if(await Pop.confirm()){
            await postsService.deletePost(props.post) 
          }
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
  i{
    height: 1.5rem;
  }
  .profile-img{
    height: 10vh;
    width: 10vh;
    object-fit: cover;
  }
  .post-image{
    object-fit: cover;
    max-width: 100%;
  }
  .post-bg{
    background-color: #c9ade4;
  }
  
</style>