// router/index.js
// 路由
import Index from '@/container/index'
import About from '@/container/about'


const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  }
]

export default routes