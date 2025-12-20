import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Projects from '@/views/Projects.vue'
import Partners from '@/views/Partners.vue'
import Contacts from '@/views/Contacts.vue'
import TeamAdmin from '@/views/TeamAdmin.vue'
import ProjectsAdmin from '@/views/ProjectsAdmin.vue'
import GalleryAdmin from '@/views/GalleryAdmin.vue'
import AboutGalleryAdmin from '@/views/AboutGalleryAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  // {
  //   path: '/partners',
  //   name: 'Partners',
  //   component: Partners
  // },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/admin/team',
    name: 'TeamAdmin',
    component: TeamAdmin
  },
  {
    path: '/admin/projects',
    name: 'ProjectsAdmin',
    component: ProjectsAdmin
  },
  {
    path: '/admin/gallery',
    name: 'GalleryAdmin',
    component: GalleryAdmin
  },
  {
    path: '/  ',
    name: 'AboutGalleryAdmin',
    component: AboutGalleryAdmin
  },
  // Catch-all маршрут для несуществующих страниц - редирект на главную
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router