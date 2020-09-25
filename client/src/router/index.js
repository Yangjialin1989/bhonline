import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'

import Hierophant from '@/views/Hierophant'

import Buddhist from '@/views/Buddhist'

import Sermon from '@/views/Sermon'
import Track from '@/views/Track'
import Grace from '@/views/Grace'
import Media from '@/views/Media'
import Data from '@/views/Data'
import Forum from '@/views/Forum'
import Contact from '@/views/Contact'
import Regist from '@/views/Regist'
import Login from '@/views/Login'
import Help from '@/views/Help'
import Map from '@/views/Map'
import Email from '@/views/Email'
import Resetpwd from '@/views/Resetpwd'
import Print from '@/views/Print'

//components
import BackTop from '@/components/BackTop'
import afterSaleImage from '@/components/afterSaleImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/hierophant',
      name: 'Hierophant',
      component: Hierophant
    },
    {
      path: '/buddhist',
      name: 'Buddhist',
      component: Buddhist
    },
    {
      path: '/sermon',
      name: 'Sermon',
      component: Sermon
    },
    {
      path: '/track',
      name: 'Track',
      component: Track
    },
    {
      path: '/grace',
      name: 'Grace',
      component: Grace
    },
    {
      path: '/media',
      name: 'Media',
      component: Media
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/email',
      name: 'Email',
      component: Email
    },
    {
      path: '/resetpwd',
      name: 'Resetpwd',
      component: Resetpwd
    },{
      path: '/print',
      name: 'Print',
      component: Print
    }
  ]
})
