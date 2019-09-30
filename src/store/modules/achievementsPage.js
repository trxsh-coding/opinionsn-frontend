import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

let store = new (StoreWithList(VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/achievements/get/1`));

export const achievementsPage = store.vuexStore;