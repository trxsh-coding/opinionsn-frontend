import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, '/messages/notification/') {



    readInitialNotifications({state, commit, dispatch}, payload={}){


        let {customUrl = '/messages/notification/read', data={}, method='post'} = payload;

        VuexStore.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setReadNotifications', successType: 'mutation'}, method);


    };



    setReadNotifications(state){

        state.read = true;
        state.counter = 0;

    }

    setNotificationsCount(state, payload){

        state.counter = payload;

    }

    /** MUTATIONS **/

    closeNotification(state, payload){

       state.items.splice(payload, 1)

    }

	closeAllNotifications(state){

		state.items = [];

	}

    clearCounter(state) {

        state.counter = 0;

    }

    get mutations(){
        return {
            ...super.mutations,
            closeNotification: this.closeNotification,
			closeAllNotifications: this.closeAllNotifications,
            clearCounter: this.clearCounter,
            setReadNotifications: this.setReadNotifications,
            setNotificationsCount: this.setNotificationsCount
        }
    }

    get actions(){
        return {
            ...super.actions,
            readInitialNotifications: this.readInitialNotifications
        }
    }



}

let store = new notificationStore();


export const notificationPage = store.vuexStore;
