<template>
	<div class="search-wrapper flex-column" :class="{'bg-white': !mobile}">
		<input-reusable
				v-model="keywords"
				class="ml-60 w-fit"
				width="165"
				input-placeholder="search"
				@keyup.enter.native="searchUsers"
		/>

		<div class="button-panel flex mt-12 ml-60">
			<button-reusable
					bg-color="#ffffff"
					button_type="underline"
					color="#1A1E22"
					active-color="#4B97B4"
					description="polls"
					@click.native="setTypeOfSearch('POLL')"
					:active="type === 'POLL'"
			/>
			<button-reusable
					bg-color="#ffffff"
					class="ml-15"
					button_type="underline"
					color="#1A1E22"
					active-color="#4B97B4"
					description="peoples"
					@click.native="setTypeOfSearch('USER')"
					:active="type === 'USER'"
					 />
		</div>

		<div
				class="links-section mt-15 ml-30 mr-20"
		        v-show="keywords !== ''">
			<search-instance
					class="mt-9"
					v-for="item in items"
					:item="item"
					:type="type"/>
		</div>

	</div>
</template>

<script>
	import IconBase from '../icons/IconBase';
	import IconClose from "../icons/IconZoomIn";
	import langMixin from '../mixins/langMixin'
	import langString from '../langString'
	import Users from "./Event/users";
	import Polls from "./Event/polls"
	import {mapState} from 'vuex'
	import {globalStoreMixin} from '../../store/modules/globalStore'
	import InputReusable from "../reusableСomponents/InputReusable";
	import VoteInstance from "../voteFeed/voteInstance";
	import SearchInstance from "./searchInstance";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";

	export default {
		mixins: [langMixin],
		components: {
			ButtonReusable,
			SearchInstance,
			VoteInstance,
			InputReusable,
			Users,
			langString,
			Polls,
			IconBase,
			IconClose
		},
		name: "search",
		data() {

			return {

				keywords: '',
				type: 'USER',
				contain: null,
				mobile: this.$root.mobile
			}

		},
		watch: {
			keywords() {
				this.searchUsers();
			}
		},
		computed: {

			...mapState('searchUser', {
				state: s => s,
				items: s => s.items

			}),


		},
		methods: {
			setTypeOfSearch(payload) {

				this.type = payload;
				this.clearForm();
				this.searchUsers();

			},
			searchUsers() {
				let type = this.type;
				let contain = this.keywords;

				if (this.type === 'POLL') {

					this.$store.dispatch('searchUser/list', {
						customUrl: `${process.env.VUE_APP_MAIN_API}/rest/search/`,
						params: {type, contain}
					})


				} else {

					this.$store.dispatch('searchUser/list', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/findAllContaining/${this.keywords}`})


				}


			},

			clearForm() {

				this.keywords = '';

			}

		}
	}
</script>

<style lang="scss">
	.search-wrapper {
		border-radius: 6px;

		.input-reusable {
			font-size: 15px;
			color: #747474;
		}

	}

	@media only screen and (min-width: 300px) and (max-width: 765px) {
		.search-wrapper {
			margin-top: 48px !important;

			.button-panel {
				display: flex;
			}
		}
	}
</style>
