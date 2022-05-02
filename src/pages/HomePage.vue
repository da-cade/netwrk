<template>
  <div v-if="myProfile.id" class="row">
    <div class="col-12">
      <div class="d-flex bg-secondary my-5 rounded shadow p-3">
        <div class="">
          <img @click="goToMyProfile()" class="profile-img hover rounded-circle" :src="myProfile.picture" alt="">
        </div>
        <div class="w-100 ms-2">
          <form @submit.prevent="newPost()">
            <div>
            <label for="new-post-field" class="form-label"></label>
            <textarea
              placeholder="Share what's happening..."
              type="text"
              class="form-control"
              id="new-post-field"
              v-model="editable.body" />
            </div>
            <div class="d-flex justify-content-between mx-1 mt-3">
              <div class="d-flex">
                <i class="mdi mdi-image-multiple hover" @click="showImgInput">Photo/Video</i>
                <div class=" ms-2 d-flex imgInput form-group" id="imgInput">
                  <label for="imgInput" class="">Add an image</label>
                  <div class="input-group">
                    <input type="text" class="form-control" name="imgInput" v-model="editable.imgUrl">
                  </div>
                </div>
              </div>
            <i class="mdi mdi-send hover" @click="newPost()">Submit</i>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Post v-for="p in state.posts" :key="p.id" :post="p" />
  <div class="row">
    <div class="d-flex justify-content-end my-3">
      <span class="" >{{pageData.page}}</span>
      <span class="ms-2 hover"  v-if="pageData.newer" @click="newer()">Newer</span>
      <span class="ms-2 hover"  v-if="pageData.older" @click="older()">Older</span>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import { computed, onMounted, reactive, ref } from "@vue/runtime-core"
import { postsService } from "../services/PostsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
export default {
  name: 'Home',
  components: {
    Post
  },
  setup(){
    const state = reactive({
      posts: computed(() => AppState.posts),
      showInput: null
    })
    const editable = ref({})
    const router = useRouter()
    onMounted( async () => {
      try {
        await postsService.getAllPosts()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
  return {
    count: 1,
    async newPost(){
      try {
        await postsService.createPost(editable.value)
        state.showInput = false
        editable.value = {}
        document.getElementById('imgInput').style = "visibility: hidden;"
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    goToMyProfile(){
      router.push({ name: 'ProfilePage' , params: { id: this.myProfile.id } })  
    },
    showImgInput(){
      state.showInput = !state.showInput
      state.showInput ? document.getElementById('imgInput').style = "visibility: visible;" : document.getElementById('imgInput').style = "visibility: hidden;"
    },
    async newer(){
      try {
        AppState.posts = []
        this.count--
        await postsService.getByPage(this.count)
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
        await postsService.getByPage(this.count)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    myProfile: computed(() => AppState.myProfile),
    pageData: computed(() => AppState.pageData),
    editable,
    state,
    }
  }
}
</script>

<style scoped lang="scss">

  .new-post-field{
    min-height: 20vh;
  }
  .profile-img{
    height: 10vh;
    width: 10vh;
    object-fit: cover;
  }
  textarea{
    min-height: 10vh;
    // max-width: 40vh;
    min-width: 100%;
  }
  .hover{
    cursor: pointer;
  }
  .imgInput{
    min-width: 8vw;
    visibility: hidden;
  }
</style>
