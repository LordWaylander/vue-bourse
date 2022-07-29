import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import Tableur from '@/pages/Tableur.vue';
import Connexion from '@/pages/Connexion.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tableur',
      name: 'tableur',
      component: Tableur
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion
    },
    {
      path:'/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
