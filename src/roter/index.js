import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home')
const cart = () => import('../views/cart/cart')
const category = () => import('../views/category/category')
const profile = () => import('../views/profile/profile')
//安装插件0
Vue.use(VueRouter)

//创建router
const routes = [
    {
        path: '',
        redirect: '/Home'
    }, {
        path: '/Home',
        component: Home
    }
    , {
        path: '/category',
        component: category
    }
    , {
        path: '/cart',
        component: cart
    }
    , {
        path: '/profile',
        component: profile
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router