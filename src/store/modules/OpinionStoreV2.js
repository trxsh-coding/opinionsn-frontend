import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";

class OpinionsStore extends StoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v1/opinion/feed/page`) {

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
        state.items[id].voted = true;
    }
    setTipId(state, id){
        state.tipId = id;
    }
    get mutations() {
        return {
            ...super.mutations,
            setFilterId: this.setFilterId,
            clearFilter: this.clearFilter,
            updatePayloadItem:this.updatePayloadItem,
            setTipId: this.setTipId
        }
    }
    get state() {
        return {
            ...super.state,
            tipId:null
        }
    }

}


let store = new OpinionsStore();

export const OpinionStore = store.vuexStore;


