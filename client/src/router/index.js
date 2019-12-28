import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'

import Hierophant from '@/views/hierophant/Hierophant'
import Part1 from '@/views/hierophant/Part1'
import Part2 from '@/views/hierophant/Part2'
import Part3 from '@/views/hierophant/Part3'
import Part4 from '@/views/hierophant/Part4'
import Part41 from '@/views/hierophant/Part41'
import Part42 from '@/views/hierophant/Part42'
import Part43 from '@/views/hierophant/Part43'

import Buddhist from '@/views/buddhist/Buddhist'
import Part5 from '@/views/buddhist/Part5'
import Part6 from '@/views/buddhist/Part6'
import Part7 from '@/views/buddhist/Part7'


import Sermon from '@/views/Sermon'
import Track from '@/views/Track'
import Grace from '@/views/Grace'
import Media from '@/views/Media'
import Live from '@/views/Live'
import Forum from '@/views/Forum'
import Contact from '@/views/Contact'
import Regist from '@/views/Regist'
import Login from '@/views/Login'
import Help from '@/views/Help'
import Map from '@/views/Map'
import Email from '@/views/Email'


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
      component: Hierophant,
      children:[
        {
          path:'part1',
          name:'Part1',
          component:Part1
        },
        {
          path:'part2',
          name:'Part2',
          component:Part2
        },
        {
          path:'part3',
          name:'Part3',
          component:Part3
        },
        {
          path:'part4',
          name:'Part4',
          component:Part4,
          children:[
            {
              path:'part41',
              name:'Part41',
              component:Part41
            },
            {
              path:'part42',
              name:'Part42',
              component:Part42
            },
            {
              path:'part43',
              name:'Part43',
              component:Part43
            }
          ]
        },
      ]
    },
    {
      path: '/buddhist',
      name: 'Buddhist',
      component: Buddhist,
      children:[
        {
          path:'part5',
          name:'Part5',
          component:Part5
        },
        {
          path:'part6',
          name:'Part6',
          component:Part6
        },
        {
          path:'part7',
          name:'Part7',
          component:Part7
        }
      ]
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
      path: '/live',
      name: 'Live',
      component: Live
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
    }
  ]
})
