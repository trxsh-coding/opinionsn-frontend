<template>

	<div class="re-upload">
		<label v-show="!file" class="select-btn pointer" @click="handleInputActions('SELECT')">
			<IconCamera/>
			<input v-if="type === 'native'" v-show="false" accept="image/*"
			       ref="inputRef" type="file" @input="handleInputActions('UPLOAD', $event)">
		</label>

		<div v-show="file" class="remove-btn pointer" @click="handleInputActions('CANCEL')">
			<IconCross fill="white" width="22" height="22"/>
		</div>

		<portal v-if="croppa" to="croppaModal">
			<div id="croppa-overlay" class="flex">
				<IconCross class="close-btn pointer" fill="white" width="50" height="50"
				           @click.native="handleInputActions('CANCEL')"/>

				<div class="m-auto flex-column relative">
					<IconCamera v-if="!croppaElement.chosenFile" class="icon-placeholder pointer absolute"
					            width="36" height="30" fill="#BCBEC3"/>

					<IconCross v-else class="reset-btn pointer" fill="#BCBEC3" width="30" height="30"
					           @click.native="handleInputActions('REFRESH')"/>

					<croppa class="m-auto" :class="{rounded}" accept="image/*" v-model="croppaElement"
					        v-bind="cCroppaProps"/>
					<button class="mt-15 mx-auto fit h-70 py-5 px-10 v-center br-6"
					        @click="handleInputActions('UPLOAD')">{{lstr('select')}}
					</button>
				</div>

			</div>
		</portal>
	</div>

</template>

<script>
	import IconCamera from "@/components/icons/create/IconCamera";
	import IconBase from "@/components/icons/IconBase";
	import IconCross from "@/components/icons/IconCross";
	import langMixin from "@/components/mixins/langMixin";

	export default {
		name: "ReUploadNew",
		components: {IconCross, IconBase, IconCamera},

		mixins: [langMixin],

		props: {
			type: {
				type: String,
				validator(value) {
					return ['native', 'croppa'].indexOf(value) !== -1;
				},
				default() {
					return 'native'
				}
			},
			croppaProps: {
				type: Object,
				default() {
					return {};
				}
			},
			rounded: Boolean
		},

		data() {
			return {
				file: null,
				url: null,
				croppa: false,
				croppaElement: {}
			}
		},

		computed: {
			cCroppaProps() {
				return {
					width: 200,
					height: 200,
					placeholder: "",
					placeholderFontSize: 12,
					zoomSpeed: 7,
					disabled: false,
					preventWhiteSpace: true,
					showRemoveButton: false,
					...this.croppaProps
				}
			}
		},

		methods: {
			handleInputActions(actionType, e) {

				if (this.type === 'native') {
					switch (actionType) {
						case 'SELECT':
							return;

						case 'UPLOAD':

							this.file = e.target.files[0];
							this.url = URL.createObjectURL(e.target.files[0]);
							this.uploadData();
							return;

						case 'CANCEL':

							this.$refs.inputRef.value = this.file = this.url = null;
							this.uploadData();
							return;

					}
				}

				if (this.type === 'croppa') {
					switch (actionType) {
						case 'SELECT':

							this.croppa = true;
							document.addEventListener('keyup', this.clearOnEscKey);
							return;

						case 'UPLOAD':

							this.croppaElement.generateBlob(blob => {

								// Get original file info
								let f = this.croppaElement.getChosenFile();

								// Add some file required fields
								blob.lastModified = f.lastModified;
								blob.lastModifiedDate = f.lastModifiedDate;
								blob.name = f.name;

								// Set blob as file
								blob = new File([blob], f.name);


								this.file = blob;
								this.url = URL.createObjectURL(blob);
								this.croppa = false;
								this.uploadData();

							}, 'image/jpeg', 1);

							return;

						case 'CANCEL':

							this.file = this.url = null;
							this.croppa = false;
							this.uploadData();
							document.removeEventListener('keyup', this.clearOnEscKey);
							return;

						case 'REFRESH':
							this.croppaElement.refresh();
							return;

					}
				}

			},

			uploadData() {
				let {file, url} = this;

				if (file && url) {
					this.$emit('upload', {file, url});
				} else {
					this.$emit('upload');
				}


			},

			clearOnEscKey({keyCode}) {
				if (keyCode === 27) {
					this.handleInputActions('CANCEL');
				}
			},

		}
	}
</script>

<style lang="scss">
	.re-upload {
		position: absolute;
		display: flex;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
	}
</style>