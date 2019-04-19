export const notificationPageList = (sc, listUrl) => class extends sc {


    onListReceived({state, commit, dispatch}, payload={}){
        state.read = false;

        let {customUrl = '/messages/notification', data={}, method='get'} = payload;

        // List through data,
        //

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };

    listItemsAction({commit, dispatch}, payload={}){


        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, dispatch, onSuccess, successType: 'action', method, params});
    }

    getNotificationInitiator({commit, dispatch}, payload={}){

        let {customUrl = `/api/rest/getUserById/${payload}`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

 /** MUTATIONS **/

 setNotification({dispatch, commit,state}, payload){
     let {responseData : items} = payload;



     if (payload.length) {

         dispatch('onListReceived')


     } else {

         state.items = [...state.items, ...items];

         dispatch('list')

     }



 }


    get state(){
        return {
            ...super.state,
            page: 0,
            read:true,
            items:[]

        }
    }


    get mutations(){
        return {
            ...super.mutations,

        }
    }

    get actions(){
        return {
            ...super.actions,
            getNotificationInitiator: this.getNotificationInitiator,
            list: this.listItemsAction,
            onListReceived: this.onListReceived,
            setNotification:this.setNotification

        }
    }

};
