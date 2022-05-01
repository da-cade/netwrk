<template>
  <form @submit.prevent="submitEdits()">
  <div class="d-flex justify-content-between">
    <div class="w-75">
      <div class="form-group">
        <label for="name" class="form-label">Username:</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="editable.name">
        </div>
        <!-- TODO -->
      <div class="form-group">
        <label for="picture" class="form-label">Change your profile picture:</label>
        <input
          type="text"
          id="picture"
          src=""
          class="form-control"
          v-model="editable.picture">
      </div>
      <div class="d-flex justify-content-between align-items-end">
        <div class="form-group">
          <label for="class" class="form-label">Add your class:</label>
          <input
            type="text"
            id="class"
            class="form-control"
            v-model="editable.class">
          </div>
        <div class="my-1">
          <div class="d-flex flex-column align-items-end">
            <p class="">Graduated?</p>
          <label for="graduated" class="form-label"></label>
          <input 
            class="form-check-input"
            type="checkbox" 
            id="graduated" 
            v-model="editable.graduated">
          </div>
        </div>
      </div>
    </div>
    <div class="ms-4 w-50">
      <div class="form-group">
        <label for="github" class="form-label">Github link:</label>
        <input
          type="text"
          id="github"
          class="form-control"
          v-model="editable.github">
      </div>
      <div class="form-group">
        <label for="linkedin" class="form-label">linkedIn link:</label>
        <input
          type="text"
          id="linkedin"
          class="form-control"
          v-model="editable.linkedin">
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Update your email:</label>
        <input
          type="text"
          id="email"
          class="form-control"
          v-model="editable.email">
      </div>
      <div class="form-group">
        <label for="resume" class="form-label">Add a resume:</label>
        <input
          type="text"
          id="resume"
          class="form-control"
          v-model="editable.resume">
      </div>
    </div>
  </div>
  <div>
    <div class="form-group">
        <label for="bio" class="form-label">Tell us a little about yourself:</label>
        <input
          type="text"
          id="bio"
          class="form-control"
          v-model="editable.bio">
      </div>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </div>
  
 </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup(){
    const editable = ref({})
    return {
      profile: computed(() => AppState.myProfile),
      editable,
    }
  }
}
</script>


<style lang="scss" scoped>
.form-group{
  margin-top: .75rem;

}
.form-label{
  margin-bottom: 0rem!important;
}
</style>