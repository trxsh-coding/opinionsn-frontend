import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, `${process.env.VUE_APP_NOTIFICATION_API}/notification/`) {



    readInitialNotifications({state, commit, dispatch}, payload={}){


        let {customUrl = `${process.env.VUE_APP_NOTIFICATION_API}/notification/read`, data={}, method='post'} = payload;

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

    clearCounter(state) {

        state.counter = 0;

    }

    get mutations(){
        return {
            ...super.mutations,
            closeNotification: this.closeNotification,
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
