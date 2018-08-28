import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './components/listQuestion.vue'
import Add from './components/addQuestion.vue'
import Question from './components/detailQuestion.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/list',
        name: 'list',
        component: List
      },{
        path: '/add',
        name: 'add',
        component: Add
      },{
        path: '/:id',
        name: 'question',
        component : Question
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
