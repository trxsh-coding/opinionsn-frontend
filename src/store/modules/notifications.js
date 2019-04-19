import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, '/messages/notification/0') {


    /** MUTATIONS **/

    closeNotification(state){


    }

    get mutations(){
        return {
            ...super.mutations,
            closeNotification: this.closeNotification
        }
    }



}

let store = new notificationStore();


export const notificationPage = store.vuexStore;