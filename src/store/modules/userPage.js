import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {userActions} from "./generic/userActions";

class userPageStore extends userActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/getUserById/:id`)) {



}

let store = new userPageStore();


export const userPage = store.vuexStore;
