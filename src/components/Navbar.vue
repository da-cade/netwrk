<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <div>
          <img alt="logo" src="https://64.media.tumblr.com/6e13ce86aadb6fc8806c386bce48616e/tumblr_nq5nxokB771svwlszo1_1280.png" height="60" />
        </div>
          <h3>A Very Sad Place</h3>
      </div>
      </router-link>
    <div class="ms-auto" >
      
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <div class="mx-2">
      <Searchbar />
    </div>  
  </nav>
</template>

<script>
import Searchbar from "./Searchbar.vue";
export default {
  setup() {
    return {};
  
    Searchbar},
};
</script>

<style scoped>
.navbar{
  background-color: rgba(137, 43, 226, 0.301);
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid rgba(0, 0, 0, 0.603);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
