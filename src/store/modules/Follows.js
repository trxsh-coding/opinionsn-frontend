import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {followsActions} from "./followsActions";

class followsPageStore extends followsActions(StoreWithList (VuexStore, `/api/rest/getFollowing`)) {

}

let store = new followsPageStore();


export const followsPage = store.vuexStore;
