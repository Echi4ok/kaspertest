<script setup>
import {ref, onMounted, watch, defineEmits} from 'vue'
import {useRouter} from 'vue-router'


const props = defineProps({
    fetchItems: Function,
    items: Array,
    fetchSortItems: Function,
})

const router = useRouter();
let input = ref('');

const emit = defineEmits(['update-value']);

const updateValue = () => {
  emit('update-value', input.value);
};

const goToUserSettings = (item) => {
  router.push({ name: 'UserSettingsPage', params: { id: item.id } });
};

onMounted(props.fetchItems)

watch(input, props.fetchSortItems)

</script>

<template>
   <div class="flex flex-col items-center min-h-screen">
    <input
      v-model="input"
      @input="updateValue"
      type="text"
      placeholder="Поиск..."
      class="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-900 mt-10"
    />

    <table class="w-1/2 border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2">Name</th>
          <th class="border border-gray-300 p-2">Status</th>
          <th class="border border-gray-300 p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.items" :key="item.id" class="hover:bg-gray-50 w-1-2" @click="goToUserSettings(item)">
          <td class="border border-gray-300 p-4 ltr text-left hover:bg-gray-100 cursor-pointer">{{ item.name }}</td>
          <td class="border border-gray-300 p-2">{{ item.status }}</td>
          <td class="border border-gray-300 p-2">{{ item.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>