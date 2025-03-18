<script setup>
const props = defineProps({
  name: {
    type: String
  }
});

</script>

<template>
<div class="tile">
  <h4 v-if="name" class="tile-head">{{name}}</h4>
  <slot/>
</div>
</template>

<style scoped>
.tile{

}

.tile-head{

}


</style>