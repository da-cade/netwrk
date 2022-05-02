
<template>
  <div class="mb-4">
    <img class="img-fluid" :src="flag.tall" :alt="flag.title">
  </div>
</template>


<script>
export default {
  props: {
    flag: {
      type: Object,
      required: true
    }
  },
  setup(){
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
  .flag-container{
    object-fit: cover;
    // position: fixed;
    max-width: 100%;
  }
</style>