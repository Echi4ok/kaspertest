<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    items: Array,
});

const route = useRoute();
const userId = ref(Number(route.params.id)); 

let originalUserObj = {};
let userObj = reactive({}); 

const isEditing = ref(false); 

onMounted(() => {
    const user = props.items.find(obj => obj.id === userId.value);
    if (user) {
        originalUserObj = { ...user }; 
        Object.assign(userObj, user);
    } else {
        console.error('Пользователь не найден');
    }
});


const editUser = () => {
    isEditing.value = true;
};

const saveUserData = async () => {
    try {
        await axios.patch(`https://f9481d1647508a94.mokky.dev/users/${userId.value}`, userObj); 
        originalUserObj = { ...userObj };
        isEditing.value = false; 
        alert('Данные успешно сохранены');
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        alert('Ошибка при сохранении данных');
    }
};


const cancelEdit = () => {
    Object.assign(userObj, originalUserObj); 
    isEditing.value = false; 
};
</script>

<template>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <h2 class="text-gray-700 font-bold text-xl">User Settings</h2>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name:
            </label>
            <input
                v-model="userObj.name"
                :disabled="!isEditing" 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="User2"
            />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                Status:
            </label>
            <div class="flex items-center">
                <input
                    id="active"
                    type="radio"
                    name="status"
                    value="Active"
                    v-model="userObj.status"
                    :disabled="!isEditing"
                />
                <label for="active" class="ml-2 block text-sm text-gray-700">
                    Active
                </label>
            </div>
            <div class="flex items-center">
                <input
                    id="inactive"
                    type="radio"
                    name="status"
                    value="Inactive"
                    v-model="userObj.status"
                    :disabled="!isEditing"
                />

                <label for="inactive" class="ml-2 block text-sm text-gray-700">
                    Inactive
                </label>
            </div>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
                Role:
            </label>
            <select
                v-model="userObj.role"
                :disabled="!isEditing"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="role"
            >
                <option value="Admin">Admin</option>
                <option value="Guest">Guest</option>
                <option value="User">User</option>
            </select>
        </div>

        <div class="flex justify-between mt-6">
            <button
                v-if="!isEditing" 
                @click="editUser"
                class="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit
            </button>
            <button
                v-if="isEditing" 
                @click="saveUserData"
                class="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
            <button
                v-if="isEditing" 
                @click="cancelEdit"
                class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Cancel
            </button>
        </div>
    </div>
</template>



  
  
          
  
  

