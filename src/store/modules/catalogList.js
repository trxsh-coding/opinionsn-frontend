import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

let store = new (StoreWithList(VuexStore, `${process.env.VUE_APP_MAIN_API}/api/rest/categories`));

export const catalogList = store.vuexStore;
