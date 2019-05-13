export const notificationPageList = (sc, listUrl) => class extends sc {


    onListReceived({state, commit, dispatch}, payload={}){

            commit('setLoading', true);

            if(state.page != 0) {


                commit('notificationStore/prependToStores', payload.responseData,{root: true})


            } else {

                commit('notificationStore/updateStores', payload.responseData,{root: true})


            }

        commit('setNextPage');

        if(!payload.responseData.length) {

            commit('setLoadedTrigger')

        }



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


        let {customUrl = `${process.env.VUE_APP_NOTIFICATION_API}/notification`, data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };

    setNextPage(state){

        state.page += 1;

    }

    setDefaultPage(state){

        state.page = 0;

    }

    setLoadedTrigger(state){

        state.loaded = true;

    }

    setLoading(state, payload) {

        state.loading = payload;

    }

    listItemsAction({state, commit, dispatch}, payload={}){


        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, dispatch, onSuccess, successType: 'action', method, params});
    }


    longPollingAction({state, commit, dispatch}, payload={}){


        let {customUrl = `${process.env.VUE_APP_NOTIFICATION_API}/notification`, data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };
 /** MUTATIONS **/

 setNotification({dispatch, commit,state}, payload){

     let {responseData : items} = payload;

     if (!items.length) {

         dispatch('longPollingAction');

     } else {
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

         state.items = [...state.items, ...items];
         state.counter+= 1 ;
         commit('notificationStore/appendToStores', items, {root: true})
         dispatch('longPollingAction')

     }



 }


    get state(){
        return {
            ...super.state,
            page: 0,
            read:true,
            loaded:false,
            counter:0,
            items:[],
            loading:false


        }
    }


    get mutations(){
        return {
            ...super.mutations,
            setNextPage: this.setNextPage,
            setLoadedTrigger: this.setLoadedTrigger,
            setLoading: this.setLoading,
            setDefaultPage: this.setDefaultPage
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
