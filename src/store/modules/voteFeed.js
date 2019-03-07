import {VuexStore} from "./generic/proto";


class VoteFeedStore extends VuexStore {


    onFeedItemsReceived(state, items){
        state.feedItems = items;
    };


    listItemsAction({commit}){

        VuexStore.apiRequest('/api/rest/vote/feed', null, {commit, onSuccess: 'onFeedItemsReceived'});
    };


    get state(){
        return {
            ...super.state,
            feedItems: [],
        }
    }


    get mutations(){
        return {
            ...super.mutations,
            onFeedItemsReceived: this.onFeedItemsReceived,
        }
    }

    get vuexStore(){
        return {
            ...super.vuexStore,
            actions: {
                list: this.listItemsAction.bind(this),
            }
        }
    }
}

let store = new VoteFeedStore();

export const voteFeed = store.vuexStore;

