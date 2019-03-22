import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {pollActions} from "./pollActions";

class VoteFeedStore extends StoreWithPageList (VuexStore, '/api/rest/vote/feed') {

    setFilterId(state, id){

        state.items = [];
        state.filter_id = id

    }

    listItemsAction(vueStuff, args={}){

        let {state} = vueStuff;

        args.params = {...args.params || {}, subscribe_id: state.filter_id};

        super.listItemsAction(vueStuff, args);
    };

    get mutations() {
        return {
            ...super.mutations,
            setFilterId: this.setFilterId
        }
    }


}


let store = new VoteFeedStore();

export const voteFeed = store.vuexStore;


