import {VuexStore} from "./generic/proto";
import {StoreWithList} from "./generic/withList";

class CatalogStore extends StoreWithList(VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/categories`){

    get mutations() {
        return {
            ...super.mutations,
        }
    }
    get state() {
        return {
            ...super.state,
        }
    }
}

let store = new CatalogStore();

export const catalogList = store.vuexStore;
