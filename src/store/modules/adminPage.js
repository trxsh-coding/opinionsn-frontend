import {VuexStore} from "./generic/proto";
import {AdminStoreWithPageList} from "./generic/adminPageList";
import {adminActions} from "./adminActions";

class adminPage extends adminActions(AdminStoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/feed`)) {





}


let store = new adminPage();

export const admin = store.vuexStore;

