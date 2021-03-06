import axios from "axios";
let counter = 0;
export const userActions = sc => class extends sc {

    getMainUser({commit, dispatch}, payload={}){

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user`, data={}, method='get', } = payload;


        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setMainUser', successType: 'action'}, method);

    };


    followUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/${id}`, data={id}, method='put', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    getFollowings({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/getFollowing`, data={}, method='get', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    getFollowers({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/getMyFollowers`, data={}, method='get', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onListReceived', successType: 'mutation'}, method);

    };

    updateUser({commit, dispatch}, payload={}){

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user`, data={}, method='post', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'action'}, method);

    };

    uploadAvatar({commit, dispatch}, payload={}){


        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/avatar`, data={}, method='post', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'globalStore/updateUserInfo', successType: 'mutation', root: true}, method);

    };

    uploadBackground({commit, dispatch}, payload={}){


        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/background`, data={}, method='post', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'globalStore/updateUserInfo', successType: 'mutation', root: true}, method);

    };

    unFollowUser({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/user/subscribe/${id}`, data={id}, method='delete', } = payload;

        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };

    onFollowUser({commit, dispatch,state, context}, args){


        let {responseData: data, requestData: payload} = args;

        let id = payload.id;

        commit(`globalStore/changeStateItem`, {mapName : 'users', parentId: id, item: 'leader', payload:true} , {root: true})



    }

    onUnFollowUser({commit, dispatch,state, context}, args){


        let {responseData: data, requestData: payload} = args;

        let id = payload.id;

        commit(`globalStore/changeStateItem`, {mapName : 'users', parentId: id, item: 'leader', payload:false} , {root: true})


    }


    getMissingUsers({commit, dispatch}, payload={}){
        let body = payload;
        let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/info/user/missing`, data=body, method=`post`} = payload;
        return sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: `action`}, method);
    }


    setMainUser({commit, dispatch, state, context}, args){

        let {responseData: data} = args;

        state.main_user_id = data.payload[0].id;

        let {id} = data.payload[0]

        commit(`globalStore/setSessionUser`, {user_id: id} , {root: true})

    }
    /* MUTATIONS */

    // setMyFollowings(state, payload){
    //
    //     let map = [];
    //
    //
    //     for (let item of payload) {
    //
    //        map.push(item.id)
    //
    //     }
    //
    //
    //     state.followings = map;
    //
    //
    // }
    hideForm(state, payload) {

        state.hide_form = payload

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
            followings:null,
            main_user_id:null,
            hide_form:true
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
            getFollowers: this.getFollowers,
            setMainUser:this.setMainUser,
            getMissingUsers: this.getMissingUsers

        }
    }

    get mutations() {
        return {
            ...super.mutations,
            removeUser: this.removeUser,
            hideForm: this.hideForm

        }
    }

};
