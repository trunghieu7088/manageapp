import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

//student management
import StudentView from '@/views/StudentView.vue'
import FeeView from '@/views/FeeView.vue'
import ReportView from '@/views/ReportView.vue'

import AccountView from '@/views/AccountView.vue'

import AdminPage from '@/layouts/AdminPage.vue'
import LoginPage from '@/layouts/LoginPage.vue'

import { userData } from '@/stores/authStore/authStore.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminPage,
      meta: { title: 'Home' },
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          component: HomeView,
          meta: { title: 'Home' },
        },
        {
          path: '/students',
          name: 'students',
          component: StudentView,
          meta: { title: 'Student List' , menuParent:'manageFee'}
        },
        {
          path: '/feepage/:id',
          name: 'feepage',
          component: FeeView,
          meta: { title: 'Fee List' , menuParent:'manageFee'}
        },
        {
          path: '/reports',
          name: 'reports',
          component: ReportView,
          meta: { title: 'Report' , menuParent:'manageFee'}
        },
        {
          path: '/accounts',
          name: 'accounts',
          component: AccountView,
          meta: { title: 'Account List' , menuParent:'manageAccount'}

        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: LoginPage,      
      meta: { title: 'Login' }
    },
            
  ]
})


router.beforeEach(async (to, from, next) => {
  
  const authUser= await userData();

  await authUser.checkAuth();

  document.title = to.meta.title ? to.meta.title : "Bo Meo App"
 
    if((authUser.isLogin !==true || authUser.isLogin ==null)  && to.name!=='login')
    {           
      next('login')
    }
    else
    {
      if(authUser.isLogin ==true && to.name=='login')
      { 
        next({name:'homepage'})
      }
      else
      {
        next()
      }
      
    }
           
 })


export default router
