import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {pollActions} from "./pollActions";

class bookmarkFeedStore extends pollActions(StoreWithList (VuexStore, `${process.env.VUE_APP_MAIN_API}/api/rest/bookmarks/`)) {

}


let store = new bookmarkFeedStore();

export const bookmarkFeed = store.vuexStore;

