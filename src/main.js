import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


import MainPage from './views/MainPage.vue'
import UserSettingsPage from './views/UserSettingsPage.vue'


const routes = [
    { path: '/', component: MainPage},
    { path: '/settings/:id', name: 'UserSettingsPage', component: UserSettingsPage, props: true }
]




const router = createRouter({
    history: createWebHistory(), 
    routes,
})


const app = createApp(App)

app.use(router)

app.mount('#app')