<template>
  <div class="flag-container my-4 p-4 w-100">
    <Flag v-for="f in flags" :key="f.title" :flag="f"/>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { flagsService } from "../services/FlagsService"
import { onMounted } from "@vue/runtime-core"
export default {
  setup(){
    onMounted(async () => {
      try {
        await flagsService.getFlags()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      flags: computed(() => AppState.flags)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>