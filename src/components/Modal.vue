<template>
 <!-- Button trigger modal -->
 
 <!-- Modal -->
 <div class="modal fade" tabindex="-1">
   <div class="modal-dialog modal-lg">
     <div class="modal-content">
      <!-- <slot name="modal-bg-slot"></slot> -->
       <slot name="modal-slot"></slot>
      <!-- <slot name="modal-title-slot"></slot> -->
       <!-- <div class="modal-body d-flex flex-column justify-content-between">
        <slot name="modal-body-slot"></slot>
       </div> -->
     </div>
   </div>
 </div>
 
</template>


<script>
export default {
 
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
  .modal-content{
    min-height: fit-content!important;
  }
</style>