<template>
  <div class="mt-5"></div>
  <Profile v-for="pr in profiles" :key="pr.id" :profile="pr" />
  <div class="my-3"></div>
  <Post v-for="p in posts" :key="p.id" :post="p"/>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup(){
    return {
      profiles: computed(() => AppState.foundProfiles),
      posts: computed(() => AppState.searchResults)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>