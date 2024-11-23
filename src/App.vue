<script setup>
import {ref} from 'vue'
import axios from 'axios'


const items = ref([]);
const inputValue = ref('');


const fetchItems = async () => {
    axios.get('https://f9481d1647508a94.mokky.dev/users')
.then((response) => {
    items.value = response.data
})
.catch((err) => {
    console.log(err.message)
    alert('Ошибка на сервере')
})
}

const fetchSortItems = async () => {
    axios.get(`https://f9481d1647508a94.mokky.dev/users?name=*${inputValue.value}*`)
.then((response) => {
    items.value = response.data
})
.catch((err) => {
    console.log(err.message)
    alert('Ошибка на сервере')
})
}



const handleValueUpdate = (newValue) => {
  inputValue.value = newValue;
  fetchSortItems();
};
</script>

<template>
 <div>
  <router-view 
  :fetch-items="fetchItems" 
  :items="items" 
  :fetch-sort-items="fetchSortItems"
  @update-value="handleValueUpdate"
  />
 </div>
</template>

<style scoped>

</style>
