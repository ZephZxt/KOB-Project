import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '@/views/pk/PkIndexView.vue'
import RankListIndexView from '@/views/ranklist/RankListIndexView.vue'
import NotFound from '@/views/error/NotFound.vue'
import RecordIndexView from '@/views/record/RecordIndexView.vue'
import UserBotIndexView from '@/views/user/bot/UserBotIndexView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/"
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RankListIndexView
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404/"
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
