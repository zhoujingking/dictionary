<script setup>
import { onMounted, ref } from 'vue';
import { getWordList } from './rest';
import Word from './component/Word.vue'

const wordList = ref([]);

onMounted(() => {
  getWordList(true).then(list => {
    wordList.value = list;
  })
}) 

</script>

<template>
  <div class="container">
    <Word v-for="(word, index) in wordList" :key="index" :data="word"></Word>
  </div>
  
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(8, 12%);
  row-gap: 16px;
}
</style>
