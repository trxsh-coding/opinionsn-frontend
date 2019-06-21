import  {
    SERVICE_WORKER_REGISTRATION,
    SET_SUBSCRIPTION,
    ENABLE_NOTIFICATION,
    DISABLE_BUTTON,
    SET_NOTIFICATION_SUPPORT,
	CONNECTION_UNSTABLE
} from "../types/mutation-types";
import  {
    CREATE_SUBSCRIPTION,
    TOGGLE_SUBSCRIPTION,
    GET_SUBSCRIPTION,
    SUBSCRIBE,
    SHOW_NOTIFICATION,
    FIND_SUBSCRIPTION,
    CHECK_SUBSCRIPTION
} from "../types/action-types";

export default  {
    namespaced:true,
    state: {

        notificationsSupported: false,
        notificationsEnabled: false,
        buttonDisabled: false,
        serviceWorkerRegistation: null,
        subscription: null,
        message: null,
		connectionUnstable: false,

	},
    mutations: {


		[CONNECTION_UNSTABLE](state, payload = true) {
			state.connectionUnstable = payload;
		},

        [SERVICE_WORKER_REGISTRATION](state, payload){
            console.log(payload)
            state.serviceWorkerRegistation = payload;


        },

        [SET_SUBSCRIPTION](state, payload){

            state.subscription = payload

        },

        [ENABLE_NOTIFICATION](state, bpayload, npayload ){

            state.buttonDisabled = bpayload;
            state.notificationsEnabled = npayload;

        },

        [DISABLE_BUTTON](state){
            state.buttonDisabled = true

        },

        [SET_NOTIFICATION_SUPPORT](state){
            console.log('AGAIN')
            if ('Notification' in window && 'serviceWorker' in navigator) {
                console.log('say_hi');
                state.notificationsSupported = true
            }
        }


    },


    actions: {

        [TOGGLE_SUBSCRIPTION]({state, commit, dispatch}){
            if (state.notificationsSupported) {
                commit('DISABLE_BUTTON');
                // Find out if we need to create a subscription or delete it
                if (!state.notificationsEnabled) {
                    // Ask permission and when granted, create new subscription

                    Notification.requestPermission()

                        .then(result => {
                            // if granted, create new subscription
                            console.log('granted');

                            if (result === 'granted') {
                                dispatch('CREATE_SUBSCRIPTION')
                                    .then(sub => {
                                        console.log('subscription created on the client', sub);
                                        commit('SET_SUBSCRIPTION', sub)
                                    })
                                    .then(() => {
                                        dispatch('SHOW_NOTIFICATION');

                                    })
                                    .catch(err => { console.log(err.message) })
                            } else {
                                console.log('User did not granted permission')
                            }
                        })
                } else {
                    // Destroy subscription
                    //TODO
                    console.log('Disable subscription');

                }
            }
        },


        [CREATE_SUBSCRIPTION]({state, commit, dispatch}) {
            console.log('ask for active service worker registration');
            if (state.serviceWorkerRegistation.pushManager === undefined) {
                return navigator.serviceWorker.ready // returns a Promise, the active SW registration
                    .then(swreg => {
                        console.log(swreg)
                        commit('SERVICE_WORKER_REGISTRATION', swreg)
                        dispatch('SUBSCRIBE', swreg)

                        console.log("subscribed");
                    })
            } else {
               return dispatch('SUBSCRIBE', state.serviceWorkerRegistation)

            }
        },

        [SUBSCRIBE]({state}){

            console.log(state)
            return state.serviceWorkerRegistation.pushManager.subscribe({
                userVisibleOnly: true
            })

        },



        [GET_SUBSCRIPTION](state) {
            console.log('ask for available subscription');
            console.log(state)
            state.serviceWorkerRegistation.pushManager.getSubscription()
        },

        [FIND_SUBSCRIPTION]({state, commit, dispatch}){
            return navigator.serviceWorker.ready
                .then(swreg => {
                    console.log('haal active subscription op');
                    commit('SERVICE_WORKER_REGISTRATION', swreg)
                    dispatch('GET_SUBSCRIPTION', state.serviceWorkerRegistation)
                })

        },

        [SHOW_NOTIFICATION]({state}, payload){
            state.serviceWorkerRegistation.showNotification('Notifications granted', {
                body: 'Here is a first notification',

            })
        },

        [CHECK_SUBSCRIPTION]({state, commit, dispatch}){


            dispatch('FIND_SUBSCRIPTION').then(sub => {

                if (sub === null) {

                    console.log('no active subscription found on the client', sub);
                    commit('ENABLE_NOTIFICATION', false, false)

                } else {

                    console.log('Active subscription found', sub);
                    // retrieve user info from API
                    commit('ENABLE_NOTIFICATION', false, true)
                    commit('SET_SUBSCRIPTION', sub)

                }


            })


        }

    },
    getters: {

    }
}
