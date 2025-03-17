<script setup>
import { computed, onMounted, ref } from 'vue';
import { getWordList } from './rest';
import Word from './component/Word.vue'

const wordList = ref([])
const searchText = ref('')

const finalWordList = computed(() => {
  if (!searchText.value) {
    return wordList.value;
  }
  return wordList.value.filter(item => {
    const reg = new RegExp(searchText.value, 'ig');
    return reg.test(item.word) || reg.test(item.trans)
  })
})

const onReset = () => {
  searchText.value = ''
}

onMounted(() => {
  getWordList().then(list => {
    wordList.value = list;
  })
}) 

</script>

<template>
  <div class="filter">
    <input type="text" v-model="searchText"> <button @click="onReset">reset</button>
  </div>
  <div class="container">
    <Word v-for="(word, index) in finalWordList" :key="index" :data="word"></Word>
  </div>
  
</template>

<style scoped>
.filter {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  margin-bottom: 16px;
}
.container {
  display: grid;
  grid-template-columns: repeat(8, 12%);
  row-gap: 16px;
}

@media print {
  .filter {
    display: none;
  }
}

@media screen and (min-width: 400px) and (max-width: 600px) {
  .container {
    font-size: 22px;
    grid-template-columns: repeat(2, 50%);
  }
}

@media screen and (min-width: 600px) and (max-width: 1000px) {
  .container {
    font-size: 22px;
    grid-template-columns: repeat(4, 25%);
  }
}
</style>
