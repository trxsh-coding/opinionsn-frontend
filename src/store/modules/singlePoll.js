import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {pollActions} from "./pollActions";

class pollFeedStore extends pollActions(StoreWithList (VuexStore, '/rest/quiz/:id')) {

}


let store = new pollFeedStore();

export const singlePoll = store.vuexStore;
