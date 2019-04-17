import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {userActions} from "./generic/userActions";

class notificationStore extends userActions(StoreWithPageList (VuexStore, '/messages/notification')) {

}

let store = new notificationStore();


export const notificationPage = store.vuexStore;
