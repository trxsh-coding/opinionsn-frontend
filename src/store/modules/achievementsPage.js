import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";
import {achievementsPageActions} from "@/store/modules/achievementsPageActions";

class achievementsPageStore extends achievementsPageActions(StoreWithList(VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/achievements/get/1`)) {

}

const store = new achievementsPageStore();

export const achievementsPage = store.vuexStore;
