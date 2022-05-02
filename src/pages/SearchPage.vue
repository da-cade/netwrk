<template>
  <div class="mt-5"></div>
  <Post v-for="p in posts" :key="p.id" :post="p"/>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup(){
    return {
      posts: computed(() => AppState.searchResults)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>