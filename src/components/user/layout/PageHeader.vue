<template>
    <div class="user-page-header" :class="{'pl-60': !mobile}">

		<ul class="btns-panel btns-panel-1 pl-21 pt-10" v-if="(user.id === mainUser.id) && mobile">
			<router-link
					tag="li"
					class="btn btn-1 pointer"
					:to="{ name: 'createPoll'}">
				<IconAddPoll fill="#4B97B4" class="add-poll-icon"/>
			</router-link>

		</ul>

		<ul class="btns-panel btns-panel-2 pl-21 pt-10" v-if="(user.id != mainUser.id) && mobile">
			<li class="btn btn-1 w-fit pointer" @click="$router.go(-1)">
				<icon-base
					class="arrow-icon"
					fill="#4B97B4"
					width="23"
					height="26"
					viewBox="0 0 23 16"
					icon-name="arrow"><icon-arrow-left/>
				</icon-base>
			</li>

		</ul>

		<div class="user-card flex-column">
			
			<RePicture class="fx-1" type="background" :url="publicPath + user.background_image" size="auto">
				<RePicture class="avatar" :url="publicPath + user.path_to_avatar" size="72" rounded />
			</RePicture>

			<button-reusable
					@click.native="$router.push({name: 'settings'})"
					v-show="user.id === mainUser.id"
					class="edit-btn py-8 px-9 mt-9 mr-20 ml-auto"
					bor-rad="30"
					:description="'edit'">
			</button-reusable>

			<button-reusable
				v-show="user.id !== mainUser.id"
				class="edit-btn py-6 px-10 mt-9 mr-20 ml-auto"
				bor-rad="30"
				:bg-color="user.isLeader ? '#BCBEC3' : '#4B97B4'"
				@click.native="subscribeActions(user.id)"
				:description="user.isLeader ? 'unfollow' : 'follow'"
			>
				<icon-base
					class="user-check mr-7"
					fill="none"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					icon-name="user-check"><icon-user-check/>
				</icon-base>
			</button-reusable>


		</div>

	</div>
</template>

<script>
	import IconBase from "../../icons/IconBase";
	import IconPocket from "../../icons/IconPocket";
	import ButtonReusable from "../../reusableСomponents/ButtonReusable";
	import langString from "../../langString";
	import IconArrowLeft from "../../icons/IconArrowLeft";
	import IconUserCheck from "../../icons/IconUserCheck";
	import PopoverReusable from "../../reusableСomponents/PopoverReusable";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import IconAddPoll from "@/components/icons/IconAddPoll";

	export default {
        name: "PageHeader",
		props: {
        	user: {
        		type: Object
			},
			mainUser: {
        		type: Object
			}
		},
		components: {
			IconAddPoll,
			RePicture,
			PopoverReusable,
			ButtonReusable,
			IconBase,
			IconPocket,
			langString,
			IconArrowLeft,
			IconUserCheck
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
				balance_popover: false
			}
		},
		computed: {
			mobile() {
				return this.$root.mobile;
			},
		},
		methods: {
			subscribeActions(id) {

				if (!this.user.isLeader) {
					this.$store.dispatch(`userPage/followUser`, id);
				} else {
					this.$store.dispatch(`userPage/unFollowUser`, id);
				}

			},
		},
		mounted() {
			this.$store.dispatch("userPage/getMainUser");
		}
	}
</script>

<style lang="scss">

	.user-page-header {
		width: 100%;
		height: 171px;

		display: flex;

		.btns-panel {
			flex: 0 0 60px;
		}

		.btns-panel-1 {


			.btn-2 {
				.pocket-icon {
					g > path {
						&:nth-of-type(1) {
							fill: #4B97B4;
						}

						&:nth-of-type(2) {
							stroke: #4B97B4;
						}

						&:nth-of-type(3) {
							stroke: #4B97B4;
						}
					}
				}
			}

		}

		.user-card {
			flex: 1;

			.background {
				position: relative;
				width: 100%;
				height: 132px;
				background-position: 50%;
				background-repeat: no-repeat;
				background-size: cover;

				.avatar {
					position: absolute;
					left: -6px;
					bottom: -29px;
				}
			}

			.edit-btn {

				.btn {
					display: flex;
					flex-direction: row-reverse;
				}
				
				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 11px;
					color: #FFFFFF;

					text-transform: uppercase;
				}
			}
		}
	}

</style>
