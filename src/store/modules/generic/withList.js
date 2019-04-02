export const StoreWithList = (sc, listUrl) => class extends sc {


    onListReceived(state, items){

        state.items = items;

        const map = {};
        items.forEach(i=>{map[i.id]=i});

        state.itemsById = map;


    }

    listItemsAction({commit}, payload={}){

        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, onSuccess, method, params});
    }


    updatePayloadItem(state, payload){
        for (let payloadItem of payload){
            let {id} = payloadItem;
            let stateItem = state.itemsById[id] || {};
            for (let fieldName of Object.keys(payloadItem)){
                stateItem[fieldName] = payloadItem[fieldName];
            }


        }

    };


    get state(){
        return {
            ...super.state,
            items: [],
            itemsMap: {},
            explainsItem:[]
        }
    }


    get mutations(){
        return {
            ...super.mutations,
            onListReceived: this.onListReceived,
            updatePayloadItem: this.updatePayloadItem,

        }
    }

    get actions(){
        return {
            ...super.actions,
            list: this.listItemsAction,

        }
    }

};
