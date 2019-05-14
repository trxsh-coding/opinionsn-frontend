import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {userActions} from "./generic/userActions";

class userMainStore extends userActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/getUser`)) {

}

let store = new userMainStore();


export const mainUser = store.vuexStore;
