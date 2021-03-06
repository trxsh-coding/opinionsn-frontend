import {StoreWithList} from "./withList";

export const StoreWithPageList = (sc, listUrl, additionalUrl) => {
    return class extends StoreWithList(sc, listUrl) {

        /// MUTATIONS
        appendElements(state, payload) {

            state.is_finished = !payload.length;

            if (state.page) state.items = [...state.items, ...payload];
            else state.items = payload;

            const map = {};
            state.items.forEach(i=>{map[i.id]=i});
            state.itemsById = map;

        };

        setPageNumber(state, payload) {
            if (payload === 0) state.is_finished = false;
            state.page = payload

        };

		decrementPage(state, payload) {
			if (state.page > 0) state.page --;
			// state.is_finished = true;
		};

		//ACTIONS

		listItemsAction({commit, state}, payload={}){
            console.log(payload)

            let  {page = 0, withCustomUrl, customUrl} = payload;
            if(withCustomUrl){
                 customUrl = payload.customUrl
            } else {
                 customUrl = `${state.filteredFeed ? additionalUrl : listUrl}/${page}`
            }

            commit('setPageNumber', page);

            super.listItemsAction({commit}, {...payload,  customUrl: customUrl, onSuccess: 'appendElements'})


        };

        loadNextPage(context, payload={}) {

            if(context.state.items.length) {

                let page = context.state.page + 1;
                context.dispatch('list', {...payload, page});

            }


        };

        get state() {
            return {
                ...super.state,
                page: 1,
                is_finished:false,
                filter_id:null,
                filteredFeed:false,
            }
        }

        get actions() {
            return {
                ...super.actions,
                loadNextPage: this.loadNextPage,
			}
        }

        get mutations() {
            return {
                ...super.mutations,
                appendElements: this.appendElements,
                setPageNumber: this.setPageNumber,
				decrementPage: this.decrementPage,
            }
        }
    }
}
