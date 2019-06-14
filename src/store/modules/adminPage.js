import {VuexStore} from "./generic/proto";
import {AdminStoreWithPageList} from "./generic/adminPageList";
import {adminActions} from "./adminActions";

class adminPageStore extends adminActions(AdminStoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/admin/panel/prediction/`)) {





}


let store = new adminPageStore();

export const adminPage = store.vuexStore;

