import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/layout/Layout.vue'
import Home from '@/views/home/mainIndex.vue'//首页
// import Home from '@/views/home/mainIndex.vue
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'',
          component:Home
       }
      ]
    },
  ]
})
