import axios from "axios";

export const userActions = sc => class extends sc {

    getMainUser({commit, dispatch}, payload={}){

        let {customUrl = `/api/rest/getUser`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setMainUser', successType: 'mutation'}, method);

    };

    followUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/follow/${id}`, data={id}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    getFollowings({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/getFollowing`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    getFollowers({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/getMyFollowers`, data={}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    updateUser({commit, dispatch}, payload={}){

        console.log(payload)

        let {customUrl = `/api/rest/updateUser`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    uploadAvatar({commit, dispatch}, payload={}){


        let {customUrl = `/api/rest/updateAvatar`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    uploadBackground({commit, dispatch}, payload={}){


        let {customUrl = `/api/rest/updateBackground`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    unFollowUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/unFollow/${id}`, data={id}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };

    onFollowUser({commit, dispatch,state, context}, args){

        console.log(args)

        let {responseData: data, requestData: payload} = args;

        let id = payload.id;

        commit(`globalStore/changeStateItem`, {mapName : 'users', parentId: id, item: 'leader', payload:true} , {root: true})



    }

    onUnFollowUser({commit, dispatch,state, context}, args){


        let {responseData: data, requestData: payload} = args;

        let id = payload.id;

        commit(`globalStore/changeStateItem`, {mapName : 'users', parentId: id, item: 'leader', payload:false} , {root: true})


    }


    /* MUTATIONS */


setMainUser(state, payload){

    state.main_user_id = payload[0].id;

    let {id} = payload[0]

    this.commit(`globalStore/setMainUser`, {user_id: id} , {root: true})

    }


    removeUser(state){

        state.main_user_id = null;
        // this.commit(`globalStore/updateUserInfo`, {user_id: id} , {root: true})

    }
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
            getMainUser: this.getMainUser,
            followUser:this.followUser,
            unFollowUser:this.unFollowUser,
            onFollowUser:this.onFollowUser,
            onUnFollowUser:this.onUnFollowUser,
            uploadAvatar: this.uploadAvatar,
            uploadBackground: this.uploadBackground,
            updateUser: this.updateUser,
            getFollowings: this.getFollowings,
            getFollowers: this.getFollowers

        }
    }

    get mutations() {
        return {
            ...super.mutations,
            setMainUser:this.setMainUser,
            removeUser: this.removeUser



        }
    }

};
