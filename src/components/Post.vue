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
                <p class="m-0">Posted: {{ new Date(post.createdAt).toDateString() }}</p>
                <i v-if="post.creator.graduated" class="mdi mdi-school"></i> 
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
        <div class="col-12 fs-5 d-flex justify-content-end mt-2">
          <p class="">
            {{ post.likeIds.length }}
          </p>
          <div v-if="profile.id" class="" @click="toggleLike()">
            <i v-if="state.liked" class="mdi mdi-heart hover m-0 p-0"></i>
            <i v-if="!state.liked" class="mdi mdi-heart-outline hover m-0 p-0"></i>
          <div v-show="!profile.id">
            <i class="mdi mdi-heart hover m-0 p-0"></i>
          </div>
          </div>
          <i v-if="post.creatorId == account.id" class="mdi mdi-delete hover" @click="deletePost()"></i>
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