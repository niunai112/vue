import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/article',
    name: '功能模块',
    meta: {title: '功能模块', icon: 'tree'},
    children: [
      {
        path: 'article',
        name: '文章',
        component: _import('article/article'),
        meta: {title: '文章', icon: 'example'},
        menu: 'article'
      },
      {
        path: 'order',
        name: '订单',
        component: _import('order/order'),
        meta: {title: '订单', icon: 'example'},
        menu: 'order'
      }
    ]
  },
  {
    path: '/merchants',
    component: Layout,
    redirect: '/merchants/',
    name: '',
    meta: {title: '商家信息', icon: 'table'},
    children: [
      {
        path: 'merchants',
        name: '商家信息',
        component: _import('merchants/merchants'),
        meta: {title: '商家信息', icon: 'password'},
        menu: 'merchants'
      },
    ]
  },
  {
    path: '/commodityKind',
    component: Layout,
    redirect: '/commodityKind/',
    name: '',
    meta: {title: '商品信息', icon: 'table'},
    children: [
      {
        path: 'commodityKind1',
        name: '商品信息',
        component: _import('commodityKind/commodityKind'),
        meta: {title: '商品信息', icon: 'password'},
        menu: 'commodityKind'
      },
    ]
  },
  {
    path: '/commodityClassif',
    component: Layout,
    redirect: '/commodityClassif/',
    name: '',
    meta: {title: '商品种类', icon: 'table'},
    children: [
      {
        path: 'commodityClassif',
        name: '商品种类',
        component: _import('commodityClassif/commodityClassif'),
        meta: {title: '商品种类', icon: 'password'},
        menu: 'commodityClassif'
      },
    ]
  },
  {
    path: '/orderManagement/orderManagement',
    component: Layout,
    redirect: '/orderManagement/',
    name: '',
    meta: {title: '订单管理', icon: 'table'},
    children: [
      {
        path: 'orderManagement',
        name: '订单管理',
        component: _import('orderManagement/orderManagement'),
        meta: {title: '订单管理', icon: 'password'},
        menu: 'orderManagement'
      },
    ]
  },
  {
    path: '/orderSon/orderSon',
    component: Layout,
    redirect: '/orderSon/',
    name: '',
    meta: {title: '订单管理子页', icon: 'table'},
    children: [
      {
        path: 'orderSon',
        name: '订单管理子页',
        component: _import('orderSon/orderSon'),
        meta: {title: '订单管理子页', icon: 'password'},
        menu: 'orderSon'
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户权限', icon: 'table'},
    children: [
      {
        path: '', name: '用户列表', component: _import('user/user'), meta: {title: '用户列表', icon: 'user'}, menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
      {
        path: 'pageTable',
        name: '页面管理',
        component: _import('pageTable/pageTable'),
        meta: {title: '页面管理', icon: 'password'},
        menu: 'pageTable'
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
