import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {followsActions} from "./followsActions";

class followsPageStore extends followsActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/getFollowing`)) {

}

let store = new followsPageStore();


export const followsPage = store.vuexStore;
