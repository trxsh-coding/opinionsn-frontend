import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {followsActions} from "./followsActions";

class searchListStore extends followsActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/findAllByContaining/`)) {
}


let store = new searchListStore();

export const searchUser = store.vuexStore;

