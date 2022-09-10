import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import Tableur from '@/pages/Tableur.vue';
import Connexion from '@/pages/Connexion.vue';
import Profil from '@/pages/Profil.vue';
import Inscription from '@/pages/Inscription.vue'

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
      path: '/tableur/:symbol',
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
      path: '/inscription',
      name: 'inscription',
      meta:{guest:true},
      component: Inscription,
    },
    {
      path: '/profil',
      name: 'profil',
      meta:{guest:false},
      component: Profil,
    },
    {
      path:'/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const cookie = $cookies.get('token')
  if ((to.meta.guest == false) && (!!cookie == false)) {
    return next({path:'/connexion'});
  }
  return next()
})


export default router
