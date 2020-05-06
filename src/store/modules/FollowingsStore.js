import {ListMixin} from "./prototype/listGeneric";
import apiGeneric from "./prototype/apiGeneric";
import {apiData} from "../../utils/api";

class FollowingsStore extends ListMixin(apiGeneric, `/rest/v2/opinion/followingsList`) {
    //MUTATIONS

    decrementFilterCounter(state, {id, key}){
        state.counterMap[key].forEach((item, index) => {
            if(item === id){
                state.counterMap[key].splice(index, 1);
                state.counterMapToDelete.push(id);
            }
        })
    }

    setCounterState(state){
        let map = {}
        state.list.forEach( item => map[item.id] = item.voteIdsToView);
        state.counterMap = map;
    }

    async ReadFilterNotifications({state}){
        try {
            await apiData({URL:`/rest/v2/opinion/view`, METHOD:'put', DATA:state.counterMapToDelete});
        } catch (e) {
            console.trace(e)
        }


    }

    get state(){
        return {
            ...super.state,
            counterMap:{},
            counterMapToDelete:[]
        }
    }
    get getters(){
        return {
            ...super.getters,
        }
    }
    get actions(){
        return {
            ...super.actions,
            ReadFilterNotifications: this.ReadFilterNotifications
        }
    }
    get mutations(){
        return {
            ...super.mutations,
            decrementFilterCounter: this.decrementFilterCounter,
            setCounterState: this.setCounterState
        }
    }
}

let store = new FollowingsStore();

export const Followings = store.vuexStore;
