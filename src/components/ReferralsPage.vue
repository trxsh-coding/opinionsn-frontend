<template>
	<div class="referrals-page flex-column py-15 pr-10">
		<template v-if="mainUser.referCode">
			<div class="header">
				<div class="btns-block flex">
					<icon-base
							@click.native="$router.go(-1)"
							class="arrow-icon mx-auto pointer"
							fill="#4B97B4"
							width="23"
							height="26"
							viewBox="0 0 23 16"
							icon-name="arrow">
						<icon-arrow-left/>
					</icon-base>
				</div>
				<div class="info flex-column">
					<span class="description text-deselect">{{lstr('your_referral_link') + ':'}}</span>
					<div class="ref-link-panel flex mt-6 p-5">
						<input ref="refLink" type="text" readonly="readonly" class="link"
						       :value="`https://opinionsn.com/registration?refer=${mainUser.referCode}`">
						<button @click="copyToClipboard($refs.refLink)" class="ml-5">{{lstr('copy')}}</button>
						<div class="counter v-center br-6 p-5 ml-5" @click="getUserList">
							<icon-user width="22" height="22"/>
							<span class="ml-4 text-center mt-1 pb-1">{{Object.keys(users_from_payload).length}}</span>
						</div>
					</div>
					<div class="hr mt-10"></div>
				</div>
			</div>
			<div class="refferals-list flex-column">
				
				<template v-if="!is_loading">
					<div class="user-instance flex mx-20 mt-12 pb-12" v-for="({id, path_to_avatar, username, date_registration}, index) in users_from_payload">
						<div class="avatar pointer w-36 h-36" @click="$router.push({name: 'user', params: { id }})"
						     :style="{background: `url('${assets_path + path_to_avatar}')`, borderRadius: '50%'}"></div>
						<div class="ml-18 caption fx-1 flex-column">
							<span class="username">{{username}}</span>
							<time-trans class="timestamp mt-3" short-time :time="date_registration"/>
						</div>
					</div>
				</template>
				
				<Loader v-show="is_loading" class="mx-auto my-9"/>
				
				<span class="empty-payload mt-12 mx-auto" v-if="payload_status">{{lstr(payload_status)}}</span>
			
			</div>
		</template>
		
		<Loader v-else class="mx-auto my-9"/>
	</div>
</template>

<script>
	import IconBase from "./icons/IconBase";
	import IconArrowLeft from "./icons/IconArrowLeft";
	import langMixin from "@/components/mixins/langMixin";
	import Loader from "@/components/reusableСomponents/Loader";
	import {mapState} from "vuex";
	import IconUser from "@/components/icons/IconUser";
	import axios from "axios";
	import TimeTrans from "@/components/timeTrans";
	
	export default {
		name: "ReferralsPage",
		components: {TimeTrans, IconUser, Loader, IconBase, IconArrowLeft},
		mixins: [langMixin],
		data() {
			return {
				payload_status: null,
				is_loading: true,
				assets_path: process.env.VUE_APP_ASSETS,
				users_from_payload: []
			}
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
						this.$popup.insert('messages', [{
							message: this.lstr('link_copied_to_clipboard'),
							type: 'success'
						}]);
					} catch (err) {
						this.$popup.insert('messages', [{message: this.lstr('unable_to_copy'), type: 'error'}]);
					}
					window.getSelection().removeAllRanges();
				}
			},
			async getUserList() {
				try {
					let {status, data} = await axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/search/user/referrals`);
					if (status === 200) {
						this.users_from_payload = data;
						if (!data.length) this.payload_status = 'you_have_no_referrals'
					}
				} catch (e) {
					this.payload_status = 'loading_error'
				} finally {
					this.is_loading = false
				}
			}
		},
		async mounted() {
			// Если юзер уже залогигнен
			if (Object.keys(this.mainUser).length && this.mainUser.referCode) {
				this.getUserList();
			} else {
				// Иначе делаем запрос на юзера
				try {
					await this.$store.dispatch("userPage/getMainUser");
					if (this.mainUser.referCode) this.getUserList();
				} catch (e) {
					this.$router.push({name: 'pollFeed'})
				}
			}
		}
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
						flex: 1;
						width: 120px;
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
		
		.refferals-list {
			.user-instance {
				border-bottom: 1px solid #d0d1d5;
				
				.avatar {
					flex: 0 0 36;
				}
				
				.caption {
					justify-content: space-between;
					
					.timestamp {
						font-weight: normal;
						font-size: 12px;
						color: #1A1E22;
						opacity: 0.6;
					}
				}
				
				
			}
			
			.empty-payload {
				font-family: Roboto, sans-serif;
				font-size: 12px;
				color: darkgray;
			}
			
		}
		
	}
</style>