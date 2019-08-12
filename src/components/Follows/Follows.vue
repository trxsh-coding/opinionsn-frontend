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

			<div class="user-info">
				<picture-reusable
						pic-class="mr-15"
						:img="publicPath + user.path_to_avatar"
						size="72"
						rounded
						text-layout="right">
					<template #title>
						{{user.username}}
					</template>
				</picture-reusable>
			</div>

		</div>

		<router-view :id="id"></router-view>

	</div>

</template>



<script>
    import event from './Event/event.vue'
	import {mapState} from "vuex";
	import PictureReusable from "../reusableСomponents/PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconArrowLeft from "../icons/IconArrowLeft";

	export default {
		components: {
			PictureReusable,
			event,
			IconBase,
			IconArrowLeft
		},
		data() {
			return {
				publicPath: process.env.VUE_APP_MAIN_API,
				mobile: this.$root.mobile
			}
		},
		computed: {

			...mapState("globalStore", {
				users: ({ users }) => users
			}),


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
			}

		}
	}

</style>
