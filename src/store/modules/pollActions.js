import axios from "axios";

export const pollActions = sc => class extends sc {

    /* ACTIONS */
    createVote({commit, dispatch}, payload={}){

        let {customUrl = '/api/rest/vote/create/', data={}, method='post'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onVoteCreated', successType: 'action'}, method);

    }



    // getFilteredFeed({commit, dispatch}, payload={}){
    //
    //     let {customUrl = '/api/rest/feed/', data={}, method='post'} = payload;
    //
    //     sc.apiRequest(customUrl, {},{commit, params: data, dispatch, onSuccess: null, successType: 'action'}, method);
    //
    // };


    setRightOption({commit, dispatch}, payload={}){

        let {customUrl = '/api/rest/admin/poll/choiceAnswer/', data={}, method='post'} = payload;

        sc.apiRequest(customUrl, {},{commit, params: data, dispatch, onSuccess: null, successType: 'action'}, method);

    };


    saveExplain({commit, dispatch}, payload={}){


        let {customUrl = '/api/rest/explain/save/', data={}, method='post'} = payload;

        sc.apiRequest(customUrl, data,{commit,dispatch, onSuccess: 'onExplainSaved', successType: 'action'}, method);

    };

    saveComment({commit, dispatch}, payload={}){


        let {customUrl = '/api/rest/comment/save/', data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onCommentSaved', successType: 'action'}, method);

    };


    loadExplains({commit, dispatch}, payload={}){


        let page = payload.explain_page

        let poll_id = payload.poll_id

        let {customUrl = `/api/rest/explain/${page}/?poll_id=${poll_id}`, data={poll_id, page}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'onShowMoreExplains', successType: 'action'}, method);

    };


    addToBookmark({commit, dispatch}, payload={}){

        let id = payload.poll_id

        let type_of_poll = payload.type_of_poll

        let {customUrl = `/api/rest/bookmarks/add/${id}?type_of_poll=${type_of_poll}`, data={id}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };


    deleteBookmark({commit, dispatch}, payload={}){

        console.log(payload)

        let id = payload

        let {customUrl = `/api/rest/bookmarks/delete/${id}`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };

    deletePoll({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/admin/poll/delete/${id}`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };


    deleteComment({commit, dispatch}, payload={}){

        let id = payload;

        let {customUrl = `/api/rest/admin/comment/delete/${id}`, data={}, method='post', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: null, successType: 'mutation'}, method);

    };

    loadComments({commit, dispatch}, payload={}){

        let comment_page = payload.comment_page;

        let id = payload.explain_id;

        let {customUrl = `/api/rest/comment/${comment_page}/?event_id=${id}`, data={id}, method='get', } = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess:'onShowMoreComments' , successType: 'action'}, method);

    };

    /* MUTATIONS */


    listItemsAction(vueStuff, args={}){

        let {state} = vueStuff;

        args.params = {...args.params || {}, categories_id: state.filter_id};

        super.listItemsAction(vueStuff, args);
    };


    onVoteCreated({commit, dispatch}, args){
        let {responseData: data} = args;


        let {id} = data.payload;

        let item = data.votes[id];

        let {poll_id} = item;

        commit(`globalStore/addChildTo`, {
                mapName: 'polls',
                parentId: poll_id,
                groupName: `votes_id`,
                item: id,
            },
            {root: true}

        );

        sc.apiRequest(`/api/rest/quiz/${poll_id}`, {},{commit, onSuccess: 'updatePayloadItem'}, 'get');

    }

    onExplainSaved({commit, dispatch}, args){
        let {responseData: data} = args;


        let {id} = data.payload;

        let item = data.votes[id];

        let {poll_id} = item;

        commit(`globalStore/addChildTo`, {
                mapName: 'polls',
                parentId: poll_id,
                groupName: `votes_id`,
                item: id,
            },
            {root: true}

        );

        commit(`globalStore/changeStateItem`, {mapName : 'polls', parentId: poll_id, item: 'isVoted', payload:true} , {root: true})

        commit(`updatePayloadItem`, [{id: poll_id, haveExplain: true}])


    }



    onShowMoreExplains({commit, dispatch}, args){
        let {responseData: data, requestData: payload} = args;


        let poll_id = payload.poll_id

        if (data.payload.length) {

            let array = [];

            for (let payload of data.payload) {

                let {id} = payload;

                array.push(id);

            }

            let {poll_id} = data.votes[array[0]];

            commit(`globalStore/addChildTo`, {
                    mapName: 'polls',
                    parentId: poll_id,
                    groupName: `explains_id`,
                    item: array,
                },
                {root: true}

            );

        } else {

            commit(`globalStore/changeStateItem`, {mapName : 'polls', parentId: poll_id, item: 'loaded', payload:true} , {root: true})

        }



    }

    onShowMoreComments({commit, dispatch,state, context}, args){
        let {responseData: data, requestData: explain_id} = args;

        console.log(explain_id)

        let id_explain = explain_id.id

        if (data.payload.length) {

            let array = [];


            for (let payload of data.payload) {

                let {id: comments_id} = payload;

                array.push(comments_id);

            }

            let {explain_id} = data.comments[array[0]];



            commit(`globalStore/addChildTo`, {
                    mapName: 'votes',
                    parentId: explain_id,
                    groupName: `comments_id`,
                    item: array,
                },
                {root: true}

            );


        } else {

        commit(`globalStore/changeStateItem`, {mapName : 'votes', parentId: id_explain, item: 'loaded', payload:true} , {root: true})

        }


    }


    setFilterId(state, id){

        state.items = [];
        state.filter_id = id

    }

    clearFilter( state){

        state.items= [];
        state.filter_id = null;
    }


    resetFeedPage(state, payload) {


        console.log(state)

        state.page = payload


    }


    onCommentSaved({commit}, args){
        let {responseData: data, requestData: payload} = args;


        let poll_id = payload.poll_id
        console.log(poll_id)

        let {id} = data.payload;
        let item = data.comments[id];
        let {explain_id} = item;

        commit(`globalStore/addChildTo`, {
            mapName: 'votes',
            parentId: explain_id,
            groupName: `comments_id`,
            item: id,
        },
        {root: true}



        );


    }

    // onShowMoreComments({commit, dispatch,state, context}, args){
    //
    //
    //          let {responseData: data, requestData: explain_id} = args;
    //
    //
    //         commit(`globalStore/changeStateItem`, {mapName : 'votes', parentId: id_explain, item: 'loaded', payload:true} , {root: true})
    //
    //
    //
    // }



    /* MUTATIONS */

    clearFeed(state){
        console.log(state)
        state.items = []


    }

    /* HELPER METHOD*/




    /* CONSTRUCTORS */
    get actions(){
        return {
            ...super.actions,
            createVote: this.createVote,
            saveExplain: this.saveExplain,
            saveComment: this.saveComment,
            onCommentSaved: this.onCommentSaved,
            onVoteCreated: this.onVoteCreated,
            onShowMoreExplains: this.onShowMoreExplains,
            loadExplains: this.loadExplains,
            loadComments: this.loadComments,
            onShowMoreComments: this.onShowMoreComments,
            setRightOption: this.setRightOption,
            addToBookmark: this.addToBookmark,
            deleteBookmark: this.deleteBookmark,
            deletePoll: this.deletePoll,
            deleteComment: this.deleteComment,
            onExplainSaved: this.onExplainSaved
        }
    }

    get mutations() {
        return {
            ...super.mutations,
            onListReceived: this.onListReceived,
            clearFeed: this.clearFeed,
            setFilterId: this.setFilterId,
            clearFilter : this.clearFilter,
            resetFeedPage: this.resetFeedPage
        }
    }

};
