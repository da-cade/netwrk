<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex flex-wrap post-bg shadow rounded my-2 p-3"> 
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="toProfile p-2">
              <img class="profile-img hover object-fit rounded-circle" :src="profile.picture" @click.stop="goToProfile()" alt="">
            </div>
            <div class="ms-5">
              <h5>{{profile.name}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>