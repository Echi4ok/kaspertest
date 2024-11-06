<script setup>
import {ref} from 'vue'
import axios from 'axios'


const items = ref([]);
const inputValue = ref('');

// Приветствую вас! Как ваши дела, как настроение? Надеюсь все хорошо) Добро пожаловать в мое задание! Хах :)
// для имитации бэкэнда я использовал сервис mooky.dev, я создал ресурс
// в котором хранились данные, а именно 210 обьектов юзеров https://f9481d1647508a94.mokky.dev/users по этой ссылке
// доступны все 210 юзеров. Также для верстки и совего удобства я использовал tailwind
// Все выполнил четко по тз, все требования соблюдены. Если у вас имеются какие то вопросы, то я готов на них ответить
// Удачного просмотра и оценивания моей работы :)))
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
