
export const followsActions = sc => class extends sc {


    followUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/follow/${id}`, data={id}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onFollowUser', successType: 'action'}, method);

    };


    unFollowUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/unFollow/${id}`, data={id}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'getFollowings', successType: 'action'}, method);

    };

    getFollowings({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/getFollowing`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    getFollowers({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/getMyFollowers`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

 

    getMyFollowings({commit, dispatch}, payload={}){

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/vote/feed/leaders`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

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
