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
            if ('Notification' in window && 'serviceWorker' in navigator) {
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

                            if (result === 'granted') {
                                dispatch('CREATE_SUBSCRIPTION')
                                    .then(sub => {
                                        commit('SET_SUBSCRIPTION', sub)
                                    })
                                    .then(() => {
                                        dispatch('SHOW_NOTIFICATION');

                                    })
                                    .catch(err => { console.log(err.message) })
                            } else {
                            }
                        })
                } else {
                    // Destroy subscription
                    //TODO

                }
            }
        },


        [CREATE_SUBSCRIPTION]({state, commit, dispatch}) {
            if (state.serviceWorkerRegistation.pushManager === undefined) {
                return navigator.serviceWorker.ready // returns a Promise, the active SW registration
                    .then(swreg => {
                        commit('SERVICE_WORKER_REGISTRATION', swreg)
                        dispatch('SUBSCRIBE', swreg)

                    })
            } else {
               return dispatch('SUBSCRIBE', state.serviceWorkerRegistation)

            }
        },

        [SUBSCRIBE]({state}){

            return state.serviceWorkerRegistation.pushManager.subscribe({
                userVisibleOnly: true
            })

        },



        [GET_SUBSCRIPTION](state) {
            state.serviceWorkerRegistation.pushManager.getSubscription()
        },

        [FIND_SUBSCRIPTION]({state, commit, dispatch}){
            return navigator.serviceWorker.ready
                .then(swreg => {
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

                    commit('ENABLE_NOTIFICATION', false, false)

                } else {

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
