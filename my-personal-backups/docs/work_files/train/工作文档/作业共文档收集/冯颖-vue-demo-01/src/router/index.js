import Vue from 'vue'
import VueRouter from 'vue-router'
// import OrganizationCenter from '../views/OrganizationCenter'
import Members from "../views/Members"
import index from '../views/index'
import eddas from '../views/web/eddas'
import UserSystem from '../views/User/UserSystem'


Vue.use(VueRouter)

const routes = [
  {
    // redirect:"OrganizationCenter",
    redirect: "Members",
    path: "/",
    name: '组织中心',
    show: true,
    component: index,
    children: [
      {
        path: '/Members',
        name: '成员',
        component: Members
      },
      {
        path: '/web/eddas',
        name: 'eddas',
        component: eddas
      },
      {
        path: '/User/UserSystem',
        name: 'UserSystem',
        component: UserSystem
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
