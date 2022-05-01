<template>
  
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