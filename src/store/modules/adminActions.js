export const adminActions = (sc, listUrl) => class extends sc {



	appendPayloads({commit, state}, payload={}){


	};
	listItemsAction({commit, state}, payload={}){

		let  {page = 0, predictionListOfType = 'all'} = payload;

		commit('setPageNumber', page);

		// , params: {predictionListOfType}

		super.listItemsAction({commit}, {...payload,  customUrl: `${ listUrl}/${page}`, params: {predictionListOfType}, onSuccess: 'appendPayloads'})


	};



	get state(){
		return {
			...super.state,

		}
	}

	get actions(){
		return {
			...super.actions,
			appendPayloads : this.appendPayloads

		}
	}

	get mutations() {
		return {
			...super.mutations,

		}
	}

}
