import {VuexStore} from "./generic/proto";
import {StoreWithPageList} from "./generic/withPageList";

class BowsStore extends StoreWithPageList (VuexStore, `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/pollId/bows/`) {
    listItemsAction(vueStuff, args={}){

        let {state} = vueStuff;
        args.withCustomUrl = true;
        super.listItemsAction(vueStuff, args);
    };

    setBowsPollId(state, payload){
        state.pollId = payload
    }
    clearState(state, payload){
        state.items = [];
        state.is_finished = false;
        state.page = 0;
    }
    get state() {

        return {
            ...super.state,
            pollId:null
        }
    }

    get mutations() {
        return {
            ...super.mutations,
            setBowsPollId: this.setBowsPollId,
            clearState: this.clearState

        }
    }



}


let store = new BowsStore();

export const BowStore = store.vuexStore;


