import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";


class userFeedStore extends StoreWithPageList (VuexStore, '/api/rest/getUserVoteFeed', '/api/rest/getUserPollFeed' ) {


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
