<template>
  <div class="d-flex">
    <form @submit.prevent="searchAny()">
      <label for="searchbar" class="visually-hidden">Search anything</label>
      <input v-model="query.search" type="text" name="searchbar" id="searchbar" placeholder="Search...">
      <i class="mt-2 ms-1 mdi mdi-magnify" @click="searchAny()"></i>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { postsService } from "../services/PostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profilesService } from "../services/ProfilesService"
import { useRouter } from "vue-router"
export default {
  setup(){
    const query = ref({})
    const router = useRouter()
    return {
      query,
      async searchAny(){
        try {
          if(query.value.search !== undefined){
            const input = query.value.search
            await postsService.getByQuery({ body: input })
            // await profilesService.getByQuery({ name: input })
            router.push({name: 'SearchPage'})
            query.value.search = ''
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
    font-size: 18pt;
  }
  i:hover{
    cursor: pointer;
  }
</style>