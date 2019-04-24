export const notificationPageList = (sc, listUrl) => class extends sc {


    onListReceived({state, commit, dispatch}, payload={}){

        console.log(payload);
        commit('notificationStore/updateStores', payload.responseData,{root: true})

        let usersToVerify = {};
        let pollsToVerify = {}
        payload.responseData.forEach(({userId, initiatorId, targetId})=>{
            usersToVerify[userId] = {action: 'userPage/getNotificationInitiator',payload: userId};
            usersToVerify[initiatorId] =  {action: 'userPage/getNotificationInitiator',payload: initiatorId};
            if (targetId){
                pollsToVerify[targetId] =  {action: 'singlePoll/getNotificationPoll',payload: targetId};
            }
         });


        dispatch('globalStore/verifyStore', {entries: usersToVerify, storeName: 'users'}, {root: true});

        dispatch('globalStore/verifyStore', {entries: pollsToVerify, storeName: 'polls'}, {root: true});


        let {customUrl = '/messages/notification', data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };



    listItemsAction({commit, dispatch}, payload={}){


        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, dispatch, onSuccess, successType: 'action', method, params});
    }


    longPollingAction({state, commit, dispatch}, payload={}){


        let {customUrl = '/messages/notification', data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };
 /** MUTATIONS **/

 setNotification({dispatch, commit,state}, payload){

     let {responseData : items} = payload;



     if (payload.length) {

         dispatch('longPollingAction')

     } else {
         state.counter++ ;
         state.items = [...state.items, ...items];
         commit('notificationStore/appendToStores', items, {root: true})
         dispatch('longPollingAction')

     }



 }


    get state(){
        return {
            ...super.state,
            page: 0,
            read:true,
            counter:0,
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
            list: this.listItemsAction,
            onListReceived: this.onListReceived,
            setNotification:this.setNotification,
            longPollingAction: this.longPollingAction
        }
    }

};
