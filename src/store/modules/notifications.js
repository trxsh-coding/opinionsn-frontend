import {VuexStore} from "./generic/notificationProto";
import {notificationPageList} from "./generic/notificationPageList";



class notificationStore extends notificationPageList(VuexStore, '/messages/notification') {


}

let store = new notificationStore();


export const notificationPage = store.vuexStore;
