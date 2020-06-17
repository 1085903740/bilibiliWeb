import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register.vue'
import login from '../views/login.vue'
import userinfo from '../views/userinfo.vue'
import edit from '../views/edit.vue'
import home from '../views/home.vue'
import article from '../views/article.vue'
import editcategory from '../views/editcategory.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:home,
    // meta:{
    //   keepalive:true
    // }
  },
  {
    path:'/article/:id',
    component:article
  },
  {
    path:'/home',
    component:home,
    meta:{
      keepalive:true
    }
  },
  {
    path:'/register',
    component:register
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/userinfo',
    component:userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path:'/edit',
    component:edit,
    meta:{
      istoken:true
    }
  },
  {
    path:'/editcategory',
    component:editcategory
  }
]

const router = new VueRouter({
  
  routes  
})

router.beforeEach((to,from,next) => {
  if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail("请重新登录");
    return
  }
  next()
})



export default router


