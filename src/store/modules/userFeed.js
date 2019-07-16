import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";


class userFeedStore extends StoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/user/feed/votes/page`, `${process.env.VUE_APP_MAIN_API}/rest/v1/user/feed/polls/page` ) {


    setFilteredFeed(state, payload){

        state.filteredFeed = payload;

    }


    get mutations() {
        return {
            ...super.mutations,
            setFilteredFeed: this.setFilteredFeed,
        }
    }

}

let store = new userFeedStore();


export const userFeed = store.vuexStore;
