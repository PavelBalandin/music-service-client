import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";

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
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Home.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Search.vue')
    },
    {
        path: '/playlists',
        name: 'playlists',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Playlists.vue')
    },
    {
        path: '/artists',
        name: 'artists',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Artists.vue')

    },
    {
        path: '/genres',
        name: 'genres',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Genres.vue')
    },
    {
        path: '/album',
        name: 'album',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/single/Album.vue')
    },
    {
        path: '/artist',
        name: 'artist',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/single/Artist.vue')
    },
    {
        path: '/playlist',
        name: 'playlist',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/single/Playlist.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const requiredAuth = to.matched.some(record => record.meta.auth)
    check().then((data) => {
        console.log(requiredAuth)
        console.log(data)
        if (requiredAuth && data) {
            next('/login')
        } else {
            next()
        }
    });

})

export default router

async function check() {
    try {
        const result = await axios.get('http://localhost:8080/api/v1/tags', {
            headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}
        });
        console.log(result.status)
        if (result.status === 200) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return true;
    }
}