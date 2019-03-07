import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

let store = new (StoreWithList(VuexStore, '/rest/getFeedByUserId/:id'));

export const userFeed = store.vuexStore;
