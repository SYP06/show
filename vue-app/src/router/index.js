import Vue from 'vue'
import VueRouter from 'vue-router'
import TV from '../views/TV'
import Music from '../views/Music'
import Book from '../views/Book'
import Detail from '../views/TvDetail'
import Chat from '../views/Chat'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TV',
    component: TV
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
