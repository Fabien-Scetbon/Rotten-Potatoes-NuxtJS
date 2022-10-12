import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _dcbf25dc = () => interopDefault(import('../pages/articles/index.vue' /* webpackChunkName: "pages/articles/index" */))
const _2f971ded = () => interopDefault(import('../pages/admin/admin.vue' /* webpackChunkName: "pages/admin/admin" */))
const _e974afca = () => interopDefault(import('../pages/admin/update.vue' /* webpackChunkName: "pages/admin/update" */))
const _166357f9 = () => interopDefault(import('../pages/admin/userCreate.vue' /* webpackChunkName: "pages/admin/userCreate" */))
const _b922713e = () => interopDefault(import('../pages/articles/add.vue' /* webpackChunkName: "pages/articles/add" */))
const _4d18f2ca = () => interopDefault(import('../pages/movies/addCom.vue' /* webpackChunkName: "pages/movies/addCom" */))
const _4b1ce52c = () => interopDefault(import('../pages/user/edit.vue' /* webpackChunkName: "pages/user/edit" */))
const _23df1d37 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _b5d4dba8 = () => interopDefault(import('../pages/user/logout.vue' /* webpackChunkName: "pages/user/logout" */))
const _eda734a4 = () => interopDefault(import('../pages/user/my-account.vue' /* webpackChunkName: "pages/user/my-account" */))
const _2759dc45 = () => interopDefault(import('../pages/user/register.vue' /* webpackChunkName: "pages/user/register" */))
const _3978aefd = () => interopDefault(import('../pages/articles/_id/index.vue' /* webpackChunkName: "pages/articles/_id/index" */))
const _25a07394 = () => interopDefault(import('../pages/movies/_movieid.vue' /* webpackChunkName: "pages/movies/_movieid" */))
const _8bdd36a4 = () => interopDefault(import('../pages/articles/_id/update.vue' /* webpackChunkName: "pages/articles/_id/update" */))
const _3c6b75a0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/articles",
    component: _dcbf25dc,
    name: "articles"
  }, {
    path: "/admin/admin",
    component: _2f971ded,
    name: "admin-admin"
  }, {
    path: "/admin/update",
    component: _e974afca,
    name: "admin-update"
  }, {
    path: "/admin/userCreate",
    component: _166357f9,
    name: "admin-userCreate"
  }, {
    path: "/articles/add",
    component: _b922713e,
    name: "articles-add"
  }, {
    path: "/movies/addCom",
    component: _4d18f2ca,
    name: "movies-addCom"
  }, {
    path: "/user/edit",
    component: _4b1ce52c,
    name: "user-edit"
  }, {
    path: "/user/login",
    component: _23df1d37,
    name: "user-login"
  }, {
    path: "/user/logout",
    component: _b5d4dba8,
    name: "user-logout"
  }, {
    path: "/user/my-account",
    component: _eda734a4,
    name: "user-my-account"
  }, {
    path: "/user/register",
    component: _2759dc45,
    name: "user-register"
  }, {
    path: "/articles/:id",
    component: _3978aefd,
    name: "articles-id"
  }, {
    path: "/movies/:movieid?",
    component: _25a07394,
    name: "movies-movieid"
  }, {
    path: "/articles/:id/update",
    component: _8bdd36a4,
    name: "articles-id-update"
  }, {
    path: "/",
    component: _3c6b75a0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
