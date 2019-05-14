import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

let store = new (StoreWithList(VuexStore, `/api/rest/categories`));

export const catalogList = store.vuexStore;
