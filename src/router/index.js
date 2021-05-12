import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: {layout: 'empty'},
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {layout: 'empty'},
        component: () => import('../views/Register.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: {layout: 'main'},
        component: () => import('../views/Home.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {layout: 'main'},
        component: () => import('../views/Search.vue')
    },
    {
        path: '/playlists',
        name: 'playlists',
        meta: {layout: 'main'},
        component: () => import('../views/Playlists.vue')
    },
    {
        path: '/artists',
        name: 'artists',
        meta: {layout: 'main'},
        component: () => import('../views/Artists.vue')

    },
    {
        path: '/genres',
        name: 'genres',
        meta: {layout: 'main'},
        component: () => import('../views/Genres.vue')
    },
    {
        path: '/album',
        name: 'album',
        meta: {layout: 'main'},
        component: () => import('../views/Album.vue')
    },
    {
        path: '/artist',
        name: 'artist',
        meta: {layout: 'main'},
        component: () => import('../views/single/Artist.vue')
    },
    {
        path: '/playlist',
        name: 'playlist',
        meta: {layout: 'main'},
        component: () => import('../views/single/Playlist.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
