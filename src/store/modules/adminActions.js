export const adminActions = (sc, listUrl) => class extends sc {



	appendPayloads({commit, state}, payload={}){

	 alert('hi')


	};
	listItemsAction({commit, state}, payload={}){

		let  {page = 0} = payload;

		commit('setPageNumber', page);

		super.listItemsAction({commit}, {...payload,  customUrl: `${ listUrl}/${page}`, onSuccess: 'appendPayloads'})


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
