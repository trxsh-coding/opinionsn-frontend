export const adminActions = sc => class extends sc {

	appendElementsTest() {

		console.log("MARK");

	}

	listItemsAction({commit, state}, payload={}){

		let  {page = 0} = payload;

		commit('setPageNumber', page);

		console.log("MARK");

		super.listItemsAction({commit}, {...payload,  customUrl: `/api/rest/feed/${page}`, onSuccess: 'appendElementsTest'})


	};

	get state(){
		return {
			...super.state
		}
	}

	get actions(){
		return {
			...super.actions
		}
	}

	get mutations() {
		return {
			...super.mutations,
			appendElementsTest: this.appendElementsTest
		}
	}

};
