<template>
 <!-- Button trigger modal -->
 
 <!-- Modal -->
 <div class="modal fade" tabindex="-1">
   <div class="modal-dialog modal-lg h-75">
     <div class="modal-content h-100">
      <slot name="modal-title-slot"></slot>
      <slot name="modal-bg-slot"></slot>
       <div class="modal-body">
        <slot name="modal-body-slot"></slot>
       </div>
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

</style>