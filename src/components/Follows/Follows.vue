<template lang="html">

	<div class="follows-section" :class="{'bg-white pt-18': !mobile, 'pt-12': mobile}">

		<div class="follows-header mb-12" v-if="user">

			<ul class="btns flex-center">

				<li class="btn btn-1 pointer" @click="$router.go(-1)">
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

			<div class="user-info flex-align-center">
				
				<RePicture class="avatar" :url="publicPath + user.path_to_avatar" size="72" rounded />
				<span class="username ml-15">{{user.username}}</span>
				
			</div>

		</div>

		<router-view :id="id"></router-view>

	</div>

</template>



<script>
    import event from './Event/event.vue'
	import {mapState} from "vuex";
	import IconBase from "../icons/IconBase";
	import IconArrowLeft from "../icons/IconArrowLeft";
    import RePicture from "@/components/reusableСomponents/RePicture";

	export default {
		components: {
			RePicture,
			event,
			IconBase,
			IconArrowLeft
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_ASSETS,
			}
		},
		computed: {

			...mapState("globalStore", {
				users: ({ users }) => users
			}),
			
			mobile() {
				return this.$root.mobile;
			},

            id() {

				return this.$route.params.id;

			},

			user() {
				return this.users[this.id];
			}

        },
		mounted() {
			this.$store.dispatch(`userPage/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/user/${this.id}`});
		}

	}
</script>

<style lang="scss">

	.follows-section {
		position: relative;
		width: 100%;
		border-radius: 6px;

		.follows-header {
			display: flex;

			.btns {
				flex: 0 0 60px;

				.btn {
					width: fit-content;
					height: fit-content;
				}
			}

			.user-info {
				flex: 1;
				
				.username {
					font-family: Roboto;
					font-style: normal;
					font-weight: 500;
					font-size: 14px;
					color: #1A1E22;
				}
			}

		}
	}

</style>
