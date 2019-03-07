import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

class searchListStore extends StoreWithList (VuexStore, '/api/rest/findAllByContaining') {

}


let store = new searchListStore();

export const searchUser = store.vuexStore;

