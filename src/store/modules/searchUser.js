import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {followsActions} from "./followsActions";

class searchListStore extends followsActions(StoreWithList (VuexStore, `/api/rest/findAllByContaining/`)) {

}


let store = new searchListStore();

export const searchUser = store.vuexStore;

