<template>
	<div v-if="isLoaded" class="header">
		<RePicture type="background" height="132" :url="backgroundImage | publicPath">
			<ReUploadNew type="croppa"
			             :croppa-props="{width: 492, height: 144}"
			             @upload="setPreloadImage('background_image', $event)"/>

			<RePicture type="background" class="avatar absolute" :url="avatar | publicPath" size="72" rounded>
				<ReUploadNew type="croppa" rounded
				             :croppa-props="{width: 144, height: 144}"
				             @upload="setPreloadImage('path_to_avatar', $event)"/>
			</RePicture>

		</RePicture>

	</div>
</template>

<script>
	import ReUpload from "../../reusableСomponents/ReUpload";
	import {mapState} from "vuex";
	import IconBase from "../../icons/IconBase";
	import IconCross from "../../icons/IconCross";
	import RePicture from "@/components/reusableСomponents/RePicture";
	import ReUploadNew from "@/components/reusableСomponents/ReUploadNew";

	export default {
		name: "pageHeader",
		components: {
			ReUploadNew,
			RePicture,
			ReUpload,
			IconBase,
			IconCross
		},

		filters: {
			publicPath(value) {
				let isBlob = value.indexOf('blob:') !== -1;
				return isBlob ? value : process.env.VUE_APP_ASSETS + value;
			}
		},

		computed: {

			...mapState('globalStore', {
				mainUser: s => s.mainUser
			}),

			...mapState('formManagment', {
				backgroundImage: s => s.edit_form.background_image,
				avatar: s => s.edit_form.path_to_avatar,
			}),

			isLoaded() {
				return !!(this.backgroundImage && this.avatar);
			}

		},

		methods: {

			setPreloadImage(key, value = {}) {

				let {file, url} = value;

				if (file && url) {
					this.$store.commit('formManagment/UPDATE_FIELD', {form: 'edit_form', key, value: url});
					this.$store.commit('formManagment/UPDATE_FIELD', {form: 'edit_form', key: '_' + key, value: file});
				} else {
					this.$store.commit('formManagment/UPDATE_FIELD', {
						form: 'edit_form',
						key,
						value: this.mainUser[key]
					});
                    this.$store.commit('formManagment/UPDATE_FIELD', {form: 'edit_form', key: '_' + key, value: null});
				}

			}

		},
	}
</script>

<style lang="scss">

	.settings-page {

		.header {
			height: 156px;

			svg {
				* {
					fill: #fff;
				}
			}

			& > .background {
				position: relative;
				background-color: #ADAFB3;

				.avatar {
					bottom: -24px;
					left: -10px;
					position: absolute !important;
				}
			}

		}
	}


</style>
