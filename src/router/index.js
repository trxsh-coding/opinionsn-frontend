import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Main from '../components/Main'
import Login from '../components/Login/Login'
import Sign from '../components/Login/Sign'
import Registration from '../components/Login/Registration'
import CreateQuiz from '../components/CreateQuiz'
import PollCreate from '../components/PollCreate'
import CreatePoll from '../components/CreatePoll'
import followers from '../components/Follows/Event/Followers'
import followings from '../components/Follows/Event/Followings'
import follows from '../components/Follows/Follows'
import VoteFeed from '../components/voteFeed/VoteFeed';
import PollFeed from '../components/pollFeed/PollFeed';
import Poll from '../components/singlePoll/feed';
import Admin from '../components/Admin/Admin';
import Catalog from '../components/Admin/Catalog';
import CatalogList from '../components/CatalogFeed/Catalog';
import bookmarkFeed from '../components/bookmarkFeed/Feed';
import CatalogFeed from '../components/CatalogFeed/Feed';
import user from '../components/user/Page';
import {nprogress} from '../main.js'

Vue.use(Router);

export const index = new Router({
  base: './',
  routes: [
    {
      path: '/',
      name: 'opinion',
      component: Main,
      redirect:
          {
            name: 'pollFeed'
          },
      children: [
        {
          path: '/user/:id',
          name:'user',
          component: user,
          props: true
        },
        {
          path: 'add',
          name: 'add',
          component: CreateQuiz,
          children: [
            {
              path: 'poll',
              name: 'poll',
              component: PollCreate
            },
            {
              path: 'prediction',
              name: 'prediction',
              component: CreatePoll
            },

          ]
        },
        {
          path: 'admin',
          name: 'admin',
          component: Admin,
          children: [
            {
              path: 'catalog',
              name: 'catalog',
              component: Catalog
            },

          ]
        },
        {
          path: 'voteFeed',
          name: 'voteFeed',
          component: VoteFeed,
        },
        {
          path: 'follows',
          name: 'follows',
          component: follows,
          redirect:
              {
                name: 'followers'
              },
          children: [
            {
              path: 'followings/:id',
              name: 'followings',
              component: followings,
              props:{isFollowing : true}
            },
            {
              path: 'followers/:id',
              name: 'followers',
              component: followers,
              props:{isFollowing : false}
            },

          ]
        },
        {
          path: 'pollFeed',
          name: 'pollFeed',
          component: PollFeed,
          props:{feed: true}

        },
        {
          path: 'catalogList',
          name: 'catalogList',
          component: CatalogList,
        },
        {
          path: 'bookmarkFeed',
          name: 'bookmarkFeed',
          component: bookmarkFeed,
        },
        {
          path: 'catalogFeed/:id',
          name: 'catalogFeed',
          component: CatalogFeed,
        },
        {
          path: 'Poll/:id',
          name: 'Poll',
          component: Poll,
          props:{feed: false}
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      name:'login',
      meta: { transitionName: 'slide' },
      redirect:
          {
            name: "sign"
          },
      children:[
        {
          path: 'sign',
          name: 'sign',
          component: Sign,
          meta: { transitionName: 'slide' }
        },
        {
          path: 'registration',
          name: 'registration',
          component: Registration,
          meta: { transitionName: 'slide' }
        },
      ]
    }
  ]
})


index.beforeResolve((to, from, next) => {
  if(to.path) {
    nprogress.start()
  }
  next()
});

index.afterEach(()=> {
  nprogress.done()
});
index.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  next();
});

index.beforeEach((to, from, next) =>  {
  if (to.path === '/login/sign' || to.path === '/login/registration') {
    next();
  } else {
    axios.get('/api/rest/getUserStatus')

        .then(response => {

          if(response.status === 200)  {

            next();

          }
        })
        .catch(error => {

          next('/login')

        })
  }
});

export default index
