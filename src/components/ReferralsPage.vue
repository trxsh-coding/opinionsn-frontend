<template>
	<div class="referrals-page">
		<div class="header">
			<div class="btns-block flex">
				<icon-base
						@click.native="$router.go(-1)"
						class="arrow-icon mx-auto pointer"
						fill="#4B97B4"
						width="23"
						height="26"
						viewBox="0 0 23 16"
						icon-name="arrow"><icon-arrow-left/>
				</icon-base>
			</div>
			<div class="info flex-column">
				<span class="description text-deselect">{{lstr('your_referral_link') + ':'}}</span>
				<div class="ref-link-panel flex mt-6 p-5">
					<input ref="refLink" type="text" readonly="readonly" class="link fx-1" :value="`https://opinionsn.com/register?refer=${mainUser.referCode}`">
					<button @click="copyToClipboard($refs.refLink)" class="ml-5">{{lstr('copy')}}</button>
					<div class="counter v-center br-6 p-5 ml-5">
						<icon-user width="22" height="22"/>
						<span class="ml-4 text-center mt-1 pb-1">{{Object.keys(users_from_payload).length}}</span>
					</div>
				</div>
				<div class="hr mt-10"></div>
			</div>
		</div>
		<div class="refferals-list flex-column">
			
			<template v-if="is_loading">
				<short-user-reusable
						class="mt-12 mx-20"
						v-for="(user, index) in users_from_payload"
						:user="user"
						:is-main-user="true"
						:key="index" />
			</template>
			
			<loader-reusable v-show="is_loading" class="mx-auto my-9" />
			
			<span class="empty-payload" v-show="payload_status">{{payload_status}}</span>
			
		</div>
	</div>
</template>

<script>
	import IconBase from "./icons/IconBase";
	import IconArrowLeft from "./icons/IconArrowLeft";
	import langMixin from "@/components/mixins/langMixin";
	import ShortUserReusable from "@/components/reusableСomponents/ShortUserReusable";
	import LoaderReusable from "@/components/reusableСomponents/LoaderReusable";
	import {mapState} from "vuex";
	import IconUser from "@/components/icons/IconUser";
	
	export default {
		name: "ReferralsPage",
		components: {IconUser, LoaderReusable, ShortUserReusable, IconBase, IconArrowLeft},
		mixins: [langMixin],
		data() {
			return {
				payload_status: null,
				is_loading: true,
				users_from_payload: []
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				if (!vm.mainUser.referCode) vm.$router.push({name: 'pollFeed'})
			})
		},
		computed: {
			...mapState('globalStore', {
				mainUser: s => s.mainUser
			})
		},
		methods: {
			copyToClipboard(elem) {
				if (elem) {
					elem.select();
					try {
						document.execCommand('copy');
						this.$popup.insert('messages', [{message: this.lstr('link_copied_to_clipboard'), type: 'success'}]);
					} catch (err) {
						this.$popup.insert('messages', [{message: this.lstr('unable_to_copy'), type: 'error'}]);
					}
					window.getSelection().removeAllRanges();
				}
			},
		},
	}
</script>

<style lang="scss">
	.referrals-page {
		
		* {
			font-family: Roboto;
			font-style: normal;
		}
		
		.header {
			display: flex;
			align-items: stretch;
			
			.btns-block {
				flex: 0 0 60px;
			}
			
			.info {
				flex: 1;
				
				.description {
					font-weight: 500;
					font-size: 16px;
					color: #4B97B4;
				}
				
				.ref-link-panel {
					border: 1px solid #CECFD3;
					.link {
						border: none;
						outline: none;
						font-weight: normal;
						font-size: 14px;
						color: #BCBEC3;
					}
					
					button {
						all: unset;
						cursor: pointer;
						user-select: none;
						padding: 5px;
						border-radius: 6px;
						background: #4B97B4;
						text-transform: uppercase;
						font-weight: normal;
						font-size: 14px;
						color: #ffffff;
					}
					
					.counter {
						background: #4B97B4;
						font-weight: normal;
						font-size: 14px;
						color: #ffffff;
						
						span {
							min-width: 24px;
							border-bottom: 2px solid #ffffff;
						}
					}
				}
				
				.hr {
					border-width: 2px;
				}
				
			}
		}
		
	}
</style>