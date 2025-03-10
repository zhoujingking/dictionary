<template>
  <span>
    <span class="word">{{ data.word }}</span>
    <!-- <span class="phone">/ {{ data.usphone }} /</span> -->
  </span>
</template>

<script setup>
const props = defineProps(['data']);


</script>

<style lang="css" scoped>
.word {

}

.phone {
  margin: 0 12px;
}
</style>