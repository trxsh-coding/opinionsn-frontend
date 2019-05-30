import {VuexStore} from "./generic/proto";
import {AdminStoreWithPageList} from "./generic/adminPageList";
import {adminActions} from "./adminActions";

class adminPage extends adminActions(AdminStoreWithPageList (VuexStore, '/api/rest/feed')) {





}


let store = new adminPage();

export const admin = store.vuexStore;

