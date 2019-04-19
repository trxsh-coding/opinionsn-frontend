import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, '/messages/notification/0') {




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
            clearCounter: this.clearCounter
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
