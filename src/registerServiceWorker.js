/* eslint-disable no-console */

import { register } from 'register-service-worker'


  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: {
      scope: './'
    },

    ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )

    },

    registered (registration) {



    },
    cached () {
    },
    updatefound () {
    },
    updated () {
    },
    offline () {
    },
    error (error) {
    }
  });

