<template>
      <div class="col-md-8">
        <div v-if="myProfile.id" class="row">
          <div class="col-12">
            <div class="d-flex w-100 bg-secondary my-5 rounded shadow p-3">
              <div class="">
                <img @click="goToMyProfile()" class="profile-img hover rounded-circle" :src="myProfile.picture" alt="">
              </div>
              <div class="w-100 ms-2">
                <form @submit.prevent="newPost()">
                  <label for="new-post-field" class="form-label"></label>
                  <textarea
                    placeholder="Share what's happening..."
                    type="text"
                    class="form-control"
                    id="new-post-field"
                    v-model="editable.body" />
                </form>
                <div class="d-flex justify-content-between mx-1 mt-3">
                  <!-- //TODO create some kind of video thing?? -->
                  <i class="mdi mdi-image-multiple hover">Photo/Video</i>
                  <i class="mdi mdi-send hover" @click="newPost()">Submit</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-md-2"></div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { postsService } from "../services/PostsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
export default {
  name: 'Home',
  setup(){
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
    async newPost(){
      try {
        await postsService.createPost(editable.value)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    goToMyProfile(){
      router.push({ name: 'ProfilePage' , params: { id: this.myProfile.id } })  
    },
    posts: computed(() => AppState.posts),
    myProfile: computed(() => AppState.myProfile),
    editable
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
</style>
