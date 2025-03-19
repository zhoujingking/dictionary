<script setup>
import { computed, onMounted, ref } from 'vue';
import { getWordList } from './rest';
import Word from './component/Word.vue'

const originalWordList = ref([])
const interWordList = ref([])
const searchText = ref('')

const finalWordList = computed(() => {
  if (!searchText.value) {
    return interWordList.value;
  }
  return interWordList.value.filter(item => {
    const reg = new RegExp(searchText.value, 'ig');
    return reg.test(item.word) || reg.test(item.trans)
  })
})

const onReset = () => {
  searchText.value = ''
  interWordList.value = originalWordList.value;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // 生成一个 0 到 i 之间的随机索引
        const j = Math.floor(Math.random() * (i + 1));
        
        // 交换元素
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const onShuffle = () => {
  interWordList.value = shuffleArray([...originalWordList.value])
}

const onSort = () => {
  interWordList.value = [...originalWordList.value].sort((a, b) => a.word > b.word ? 1 : -1);
}

onMounted(() => {
  getWordList().then(list => {
    originalWordList.value = list;
    interWordList.value = list;
  })
}) 

</script>

<template>
  <div class="filter">
    <input type="text" v-model="searchText"> 
    <button @click="onReset">reset</button>
    <button @click="onShuffle">shuffle</button>
    <button @click="onSort">asc</button>
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
