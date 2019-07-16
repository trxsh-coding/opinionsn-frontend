import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {pollActions} from "./pollActions";

class pollFeedStore extends pollActions(StoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/feed/page`)) {




}


let store = new pollFeedStore();

export const pollFeed = store.vuexStore;

