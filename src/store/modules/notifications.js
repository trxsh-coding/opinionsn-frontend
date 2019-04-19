import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, '/messages/notification/0') {




    /** MUTATIONS **/

    closeNotification(state, payload){

       state.items.splice(payload, 1)

    }

    get mutations(){
        return {
            ...super.mutations,
            closeNotification: this.closeNotification
        }
    }

    get actions(){
        return {
            ...super.actions,
        }
    }



}

let store = new notificationStore();


export const notificationPage = store.vuexStore;
