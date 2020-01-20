import {VuexStore} from "./generic/proto";
import {AdminStoreWithPageList} from "./generic/adminPageList";
import {adminActions} from "./adminActions";

class adminPageStore extends adminActions(AdminStoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/admin/panel/prediction/page`)) {


}


let store = new adminPageStore();

export const adminPage = store.vuexStore;

