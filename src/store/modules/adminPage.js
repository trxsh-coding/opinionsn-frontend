import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {adminActions} from "./adminActions";

class adminPage extends adminActions(StoreWithPageList (VuexStore, '/api/rest/feed')) {





}


let store = new adminPage();

export const admin = store.vuexStore;

