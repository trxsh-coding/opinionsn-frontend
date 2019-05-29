import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {adminActions} from "./adminActions";

class adminStore extends adminActions(StoreWithPageList (VuexStore, '/api/rest/feed')) {


}


let store = new adminStore();

export const adminPage = store.vuexStore;

