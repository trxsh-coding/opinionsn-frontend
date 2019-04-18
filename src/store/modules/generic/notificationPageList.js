export const notificationPageList = (sc, listUrl) => class extends sc {


    onListReceived(state){

        state.read = false

        let {customUrl = `/messages/notification/${state.page}`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess:null , successType: 'action'}, method);

    }

    listItemsAction({commit}, payload={}){

        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, onSuccess, method, params});
    }




    get state(){
        return {
            ...super.state,
            page: 0,
            read:true,

        }
    }


    get mutations(){
        return {
            ...super.mutations,
            onListReceived: this.onListReceived,

        }
    }

    get actions(){
        return {
            ...super.actions,
            list: this.listItemsAction,

        }
    }

};
