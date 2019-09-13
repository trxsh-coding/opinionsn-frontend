
export const followsActions = sc => class extends sc {


    followUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/${id}`, data={id}, method='put', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onFollowUser', successType: 'action'}, method);

    };


    unFollowUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/${id}`, data={id}, method='delete', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'getFollowings', successType: 'action'}, method);

    };

    getFollowings({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscriptions`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    getFollowers({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/getMyFollowers`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };



    getMyFollowings({commit, dispatch}, payload={}){

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/search/user/opinion`, data={}, method='get', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };




    /* MUTATIONS */



    /* HELPER METHOD*/




    /* CONSTRUCTORS */
    get state(){
        return {
            ...super.state,
            main_user_id:null,
            user_authorities:''
        }
    }

    get actions(){
        return {
            ...super.actions,
            followUser:this.followUser,
            unFollowUser:this.unFollowUser,
            getFollowings: this.getFollowings,
            getFollowers: this.getFollowers,
            getMyFollowings: this.getMyFollowings

        }
    }

    get mutations() {
        return {
            ...super.mutations,

        }
    }

};
