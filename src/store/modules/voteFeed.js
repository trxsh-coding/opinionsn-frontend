import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";
import {pollActions} from "./pollActions";

class VoteFeedStore extends StoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/user/feed/votes/mobile/page/`) {

    setFilterId(state, id){

        state.items = [];
        state.filter_id = id

    }

    listItemsAction(vueStuff, args={}){

        let {state} = vueStuff;

        args.params = {...args.params || {}, subscribe_id: state.filter_id};

        super.listItemsAction(vueStuff, args);
    };

    clearFilter(state){

        state.items= [];
        state.filter_id = null;
    }

    updatePayloadItem(state, id){
        state.items[id].voted = true
    }

    get mutations() {
        return {
            ...super.mutations,
            setFilterId: this.setFilterId,
            clearFilter: this.clearFilter
        }
    }


}


let store = new VoteFeedStore();

export const voteFeed = store.vuexStore;


