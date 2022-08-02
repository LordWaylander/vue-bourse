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
      meta:{guest:true},
      component: Home,
    },
    {
      path: '/tableur',
      name: 'tableur',
      meta:{guest:false},
      component: Tableur,
    },
    {
      path: '/connexion',
      name: 'connexion',
      meta:{guest:true},
      component: Connexion,
    },
    {
      path:'/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ((to.meta.guest == false) && (!!localStorage.getItem('token') == false)) {
    return next({path:'/connexion'});
  }
  return next()
})


export default router
