import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

export const achievementsPage = new (StoreWithList(VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/achievementsPage`)).vuexStore;
