<template>
	<div class="search-wrapper flex-column" :class="{'bg-white pt-21 pb-19': !mobile, 'pt-58': mobile, 'is_mobile_device': mobile}">
		<input-reusable
				v-if="mobile"
				v-model="keywords"
				input-class="pr-28"
				class="search-input pl-60 pr-86"
				width="100%"
				input
				height="33"
				input-placeholder="search"
				@keyup.enter.native="searchUsers"
				with-action-buttons/>
		
		<div class="button-panel flex pl-60" :class="{'mt-12': mobile}">
			
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
				class="links-section mt-15 mr-20 "
				:class="{'ml-30': mobile, 'ml-60': !mobile}"
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
	import {mapState} from 'vuex'
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
			langString,
			IconBase,
			IconClose
		},
		name: "search",
		data() {
			
			return {
				
				keywords: this.search_keyword || '',
				type: 'USER',
				contain: null,
				timer_id: null
			}
			
		},
		watch: {
			keywords() {
				this.searchUsers();
			},
			search_keyword(val) {
				this.keywords = val;
				this.searchUsers();
			}
		},
		computed: {
			
			...mapState('searchUser', {
				state: s => s,
				items: s => s.items
				
			}),
			
			mobile() {
				return this.$root.mobile;
			},
			
			search_keyword() {
				return this.$root.search_keyword
			},
			
		},
		methods: {
			setTypeOfSearch(payload) {
				
				this.type = payload;
				this.clearForm();
				this.searchUsers();
				
			},
			searchUsers() {
				
				clearTimeout(this.timer_id);
				
				this.timer_id = setTimeout(() => {
					let type = this.type;
					let contain = this.keywords;
					
					if (this.type === 'POLL') {
						
						this.$store.dispatch('searchUser/list', {
							customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/search/polls`,
							params: {type, contain}
						})
						
						
					} else {
						
						this.$store.dispatch('searchUser/list', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/search/user/containing/${contain}`})
						
						
					}
				}, 500);
				
			},
			
			clearForm() {
				
				this.$root.search_keyword = '';
				this.keywords = '';
				
			},
			
		},
		
		beforeRouteLeave(to, from, next) {
			this.clearForm();
			next();
		}
	}
</script>

<style lang="scss">
	.search-wrapper {
		border-radius: 6px;
		
		.search-input {
			font-size: 15px;
			color: #747474;
			
			.input-placeholder {
				font-size: 15px;
				transform: translateY(-50%);
				top: 50%;
			}
		}
		
		&.is_mobile_device {
			margin-top: 48px !important;
			
			.button-panel {
				display: flex;
			}
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
