import axios from 'axios';

export const pollActions = sc => class extends sc {

	/* ACTIONS */
	createVote({commit, dispatch}, payload = {}) {


		commit(`globalStore/currentLoadingOption`, {id: payload.data.selected_variable, value: true}, {root: true});
		let typeOfVote;

		if (payload.data.type_of_poll >= 2) {

			typeOfVote = `${process.env.VUE_APP_MAIN_API}/rest/v1/blockchain/vote/`

		} else {

			typeOfVote = `${process.env.VUE_APP_MAIN_API}/rest/v1/vote/`

		}


		let {customUrl = `${typeOfVote}`, data = {}, method = `put`} = payload;

		return sc.apiRequest(customUrl, data, {
			commit,
			dispatch,
			onSuccess: `onVoteCreated`,
			successType: `action`
		}, method);

	}

	setRightOption({commit, dispatch}, payload = {}) {

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/admin/poll/option/choice`, data = {}, method = `post`} = payload;

		return sc.apiRequest(customUrl, {}, {
			commit,
			params: data,
			dispatch,
			onSuccess: null,
			successType: `action`
		}, method);

	};


	setBlockchainRightOption({commit, dispatch}, payload = {}) {

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/blockchain/judge/create`, data = {}, method = `post`} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `action`}, method);

	};


	saveExplain({commit, dispatch}, payload = {}) {

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v2/explain/`, data = {}, method = `put`} = payload;

		return sc.apiRequest(customUrl, data, {
			commit,
			dispatch,
			onSuccess: `onExplainSaved`,
				successType: `action`
		}, method);

	};

	saveComment({commit, dispatch}, payload = {}) {

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/comment/`, data = {}, method = `put`,} = payload;

		// console.log(payload)
		return sc.apiRequest(customUrl, data, {
			commit,
			dispatch,
			onSuccess: `onCommentSaved`,
			successType: `action`
		}, method);

	};


	loadExplains({commit, dispatch}, payload = {}) {


		let page = payload.explain_page

		let poll_id = payload.poll_id

		let {
			customUrl = `${process.env.VUE_APP_MAIN_API}/rest/explain/${page}/?poll_id=${poll_id}`, data = {
				poll_id,
				page
			}, method = `get`,
		} = payload;

		return sc.apiRequest(customUrl, data, {
			commit,
			dispatch,
			onSuccess: `onShowMoreExplains`,
			successType: `action`
		}, method);

	};


	addToBookmark({commit, dispatch}, payload = {}) {

		let id = payload.poll_id

		let type_of_poll = payload.type_of_poll

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/bookmarks/${id}?type_of_poll=${type_of_poll}`, data = {id}, method = `put`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};

	getQuestionMixin({commit, dispatch}, payload = {}) {
		console.log(payload)
		const id = payload ;
		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${id}/mixin/single`, data = {id}, method = `get`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};


	deleteBookmark({commit, dispatch}, payload = {}) {

		let id = payload

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v1/bookmarks/${id}`, data = {}, method = `delete`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};

	deletePoll({state, commit, dispatch}, payload = {}) {

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/admin/poll/${payload}`, data = {}, method = `delete`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};


	deleteComment({commit, dispatch}, payload = {}) {

		let id = payload;

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/admin/comment/delete/${id}`, data = {}, method = `post`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};

	blockQuestion({commit, dispatch}, payload = {}) {

		let id = payload;

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${id}/hide`, data = {}, method = `post`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};

	reportQuestion({commit, dispatch}, payload = {}) {

		let id = payload;

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${id}/report`, data = {}, method = `post`,} = payload;

		return sc.apiRequest(customUrl, data, {commit, dispatch, onSuccess: null, successType: `mutation`}, method);

	};

	loadComments({commit, dispatch}, payload = {}) {

		let comment_page = payload.comment_page;

		let id = payload.explain_id;

		let {customUrl = `${process.env.VUE_APP_MAIN_API}/rest/comment/${comment_page}/?event_id=${id}`, data = {id}, method = `get`,} = payload;

		return sc.apiRequest(customUrl, data, {
			commit,
			dispatch,
			onSuccess: `onShowMoreComments`,
			successType: `action`
		}, method);

	};

	/* MUTATIONS */

	listItemsAction(vueStuff, args = {}) {
		let {state} = vueStuff;
		args.params = {...args.params || {}, categories_id: state.filter_id};

		super.listItemsAction(vueStuff, args);
	};

	deleteItemFromPayload(state, payload) {
        state.items = state.items.filter(({id}) => id !== payload)
	};

	onVoteCreated({commit, dispatch}, args) {
		let {responseData: data, requestData: payload} = args;


		let {id} = data.payload;

		let item = data.votes[id];

		let {poll_id} = item;

		commit('globalStore/addChildTo', {
				mapName: 'polls',
				parentId: poll_id,
				groupName: 'votes_id',
				item: id,
			},
			{root: true}
		);
		commit(`onVoteLoading`, false)

		commit(`globalStore/currentLoadingOption`, {id: payload.selected_variable, value: false}, {root: true});


		sc.apiRequest(`${process.env.VUE_APP_MAIN_API}/rest/v1/poll/${poll_id}`, {}, {
			commit,
			onSuccess: `updatePayloadItem`
		}, `get`);


	}


	onShowMoreExplains({commit, dispatch}, args) {
		let {responseData: data, requestData: payload} = args;


		let poll_id = payload.poll_id

		if (data.payload.length) {

			let array = [];

			for (let payload of data.payload) {

				let {id} = payload;

				array.push(id);

			}

			let {poll_id} = data.votes[array[0]];

			commit('globalStore/addChildTo', {
					mapName: 'polls',
					parentId: poll_id,
					groupName: 'votes_id',
					item: array,
				},
				{root: true}
			);

		} else {

			commit(`globalStore/changeStateItem`, {
				mapName: `polls`,
				parentId: poll_id,
				item: `loaded`,
				payload: true
			}, {root: true})

		}


	}

	onShowMoreComments({commit, dispatch, state, context}, args) {
		let {responseData: data, requestData: explain_id} = args;


		let id_explain = explain_id.id

		if (data.payload.length) {

			let array = [];


			for (let payload of data.payload) {

				let {id: comments_id} = payload;

				array.push(comments_id);

			}

			let {explain_id} = data.comments[array[0]];


			commit('globalStore/addChildTo', {
					mapName: 'votes',
					parentId: explain_id,
					groupName: 'comments_id',
					item: array,
				},
				{root: true}
			);


		} else {

			commit(`globalStore/changeStateItem`, {
				mapName: `votes`,
				parentId: id_explain,
				item: `loaded`,
				payload: true
			}, {root: true})

		}


	}

	onVoteLoading(state, payload) {

		state.blockchain_loading = payload

	}

	setFilterId(state, id) {

		state.items = [];
		state.filter_id = id

	}

	clearFilter(state) {

		state.items = [];
		state.filter_id = null;
	}


	resetFeedPage(state, payload) {
		state.page = payload
	}

	onExplainSaved({commit, dispatch}, args) {
		let {responseData: data} = args;


		let {id} = data.payload[0];
		console.log(data.payload[0])
		let item = data.votes[id];
		console.log(item)
		let {poll_id} = item;

		commit('globalStore/addChildTo', {
				mapName: 'polls',
				parentId: poll_id,
				groupName: 'votes_id',
				item: id,
			},
			{root: true}
		);

		// Увеличиваем счетчик комментариев в polls[poll_id].total_amount_of_votes
		commit('globalStore/addQuantityTo', {
			mapName: 'polls',
			parentId: poll_id,
			groupName: 'total_amount_of_comments',
			quantity: 1
		}, {root: true});

		commit(`globalStore/changeStateItem`, {
			mapName: `polls`,
			parentId: poll_id,
			item: `isVoted`,
			payload: true
		}, {root: true})

		commit(`updatePayloadItem`, [{id: poll_id, haveExplain: true}])


	}


	onCommentSaved({commit}, args) {
		let {responseData: data, requestData: payload} = args;


		let poll_id = payload.poll_id
		let {id} = data.payload[0];
		let item = data.comments[id];
		let {explain_id} = item;

		commit('globalStore/addChildTo', {
			mapName: 'votes',
			parentId: explain_id,
			groupName: 'comments_id',
			item: id,
		}, {root: true});

		// Увеличиваем счетчик комментариев в polls[poll_id].total_amount_of_comments
		commit('globalStore/addQuantityTo', {
			mapName: 'polls',
			parentId: poll_id,
			groupName: 'total_amount_of_comments',
			quantity: 1
		}, {root: true});

		// sc.apiRequest(`${process.env.VUE_APP_MAIN_API}/rest/quiz/getOne/${poll_id}`, {},{commit, onSuccess: `updatePayloadItem`}, `get`);


	}

	// onShowMoreComments({commit, dispatch,state, context}, args){
	//
	//
	//          let {responseData: data, requestData: explain_id} = args;
	//
	//
	//         commit(`globalStore/changeStateItem`, {mapName : `votes`, parentId: id_explain, item: `loaded`, payload:true} , {root: true})
	//
	//
	//
	// }


	/* MUTATIONS */

	clearFeed(state) {
		state.items = []
	}

	/* HELPER METHOD*/


	/* CONSTRUCTORS */

	get state() {
		return {
			...super.state,

			blockchain_loading: false

		}
	}

	get actions() {
		return {
			...super.actions,
			blockQuestion: this.blockQuestion,
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
			onExplainSaved: this.onExplainSaved,
			setBlockchainRightOption: this.setBlockchainRightOption,
			getQuestionMixin: this.getQuestionMixin,
			reportQuestion: this.reportQuestion
		}
	}

	get mutations() {
		return {
			...super.mutations,
			onListReceived: this.onListReceived,
            deleteItemFromPayload: this.deleteItemFromPayload,
			clearFeed: this.clearFeed,
			setFilterId: this.setFilterId,
			clearFilter: this.clearFilter,
			resetFeedPage: this.resetFeedPage,
			onVoteLoading: this.onVoteLoading
		}
	}

};
