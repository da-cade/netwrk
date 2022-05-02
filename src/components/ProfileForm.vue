<template>

  <div class="container-fluid">
    <form name="edit-form" class="" @submit.prevent="submitEdits()">
    <div class="row">
      <div class="col-12">
        <div class="header-bg" :style="{'background-image':`url(${profile.coverImg})`}"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="d-flex floater align-items-end">
          <div class="d-flex align-items-center">
            <img :src="profile.picture" class="profile-img rounded-circle" alt="">
          </div>
          <h4 class="ms-3">{{profile.name}}</h4>
      </div>
      </div>
      <div class="col-6">
        <div class="form-group" style="">
          <label for="coverImg" class="form-label visually-hidden">Change your cover photo:</label>
          <input
            placeholder="Change your cover photo"
            type="text"
            id="coverImg"
            src=""
            class="form-control"
            v-model="editable.coverImg">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
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
      <div class="col-5">
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
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="bio" class="form-label">Tell us a little about yourself:</label>
          <textarea
            type="text"
            id="bio"
            class="form-control"
            v-model="editable.bio">
            </textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="ms-auto">
          <button type="submit" class="btn btn-primary me-3">Submit</button>
          <button type="button" for="edit-form" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { accountService } from "../services/AccountService"
export default {
  setup(){
    const editable = ref({})
    return {
      profile: computed(() => AppState.myProfile),
      editable,
      async submitEdits(){
        try {
          await accountService.submitEdits(editable.value)
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
.header-bg{
  background-size: cover;
  background-position-y: 50%;
  min-height: 25vh;
  min-width: auto;
}
.form-group{
  margin-top: .75rem;
}
.form-label{
  margin-bottom: 0rem!important;
}
.modal-body{
  height: 65%;
}
textarea {
  min-height: 10vh;
  margin-bottom: 1rem;
}
.floater{
  // left: 10px;
  bottom: 57%; 
  position: absolute;
}
</style>