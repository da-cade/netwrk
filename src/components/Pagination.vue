<template>
  <div class="d-flex justify-content-end my-3">
    <span class="" >{{pageData.page}}</span>
    <span class="ms-2 hover"  v-if="pageData.newer" @click="newer()">Newer</span>
    <span class="ms-2 hover"  v-if="pageData.older" @click="older()">Older</span>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { postsService } from "../services/PostsService"
import { AppState } from "../AppState"
export default {
  setup(){
    return {
      pageData: computed(() => AppState.pageData),
      activeProfile: computed(() => AppState.activeProfile),
      count: 1,
      async newer(){
      try {
        this.count--
        if(this.activeProfile.id){
          await postsService.getByPage(this.count, this.activeProfile)
        } else{
          await postsService.getByPage(this.count)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    async older(){
      console.log(this.activeProfile)
      try {
        this.count++
        if(this.activeProfile.id){
          await postsService.getByPage(this.count, this.activeProfile)
        } else {
          await postsService.getByPage(this.count)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },
    }
  }
}
</script>


<style lang="scss" scoped>

</style>