import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {pollActions} from "./pollActions";

class bookmarkFeedStore extends pollActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/bookmarks/`)) {

}


let store = new bookmarkFeedStore();

export const bookmarkFeed = store.vuexStore;

