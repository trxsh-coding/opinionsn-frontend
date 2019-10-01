import Vue from 'vue';

export const achievementsPageActions = (sc) => class extends sc {


	async getAchievementList({rootState, state, dispatch}, payload = {}) {
		try {

			if (!rootState.globalStore.mainUser.id) await dispatch('userPage/getMainUser', {}, {root: true});

			let { status } = await dispatch('list', {urlParams: rootState.globalStore.mainUser.id});
			if (status === 200) {
				let { achievements } = rootState.globalStore;

				let itemsByName = {};
				state.items.forEach(item => {
					itemsByName[item.name] = item;
				});

				let result = Object.values(achievements).map((a) => (
					itemsByName[a.name]) ? Object.assign({}, a, itemsByName[a.name]) : a
				);

				return result.sort((a, b) => {
					switch (true) {
						case a._checked === b._checked:
							return 0;
						case a._checked && !b._checked:
							return -1;
						default:
							return 1;
					}
				})

			} else {
				throw new Error(`Wrong response status (${status})`);
			}
		} catch (e) {
			console.error(e);
		}
	}

	get state() {
		return {
			...super.state,

		}
	}

	get actions() {
		return {
			...super.actions,
			getAchievementList: this.getAchievementList

		}
	}

	get mutations() {
		return {
			...super.mutations,
		}
	}

}
