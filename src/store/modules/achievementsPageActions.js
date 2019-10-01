import Vue from 'vue';

export const achievementsPageActions = (sc) => class extends sc {


	async getAchievementList({rootState, state, commit, dispatch}, payload = {}) {
		try {
			let { status } = await dispatch('list');
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
						case a._gained === b._gained:
							return 0;
						case a._gained && !b._gained:
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
