<template>
	<div class="poll-create-wrapper">

		<switch-component
				:height="21"
				:width="34"
				:bor-rad="18"
				color="#B7B9BE"
				active-color="#81B6CB"
				:boolean="boolean"
				@change="onSelect"
				active-description="OFF-CHAIN"
				inactive-description="BLOCKCHAIN"
				text-layout="right"/>
	</div>
</template>

<script>

	import SwitchComponent from "./reusableСomponents/switchComponent";


	export default {
		name: "CreatePoll",
		mixins: [BadWordsFilter],
		data() {
			return {
				boolean:true,
				loading: false,
				mainPicture: false,
				optionPicture: false,
				exception: false,
				imageUrl: '',
				picture: '',
				pictures: [],
				date_poll: true,
				pollForm: {
					picture: '',
					subject_header: '',
					subject: '',
					tags: '',
					description: '',
					type_of_poll: '0',
					end_date: '',
					end_time: '',
					fund: '100',
					judges: [],
					options: [
						{
							optionImageUrl: '',
							id: '',
							picture: '',
							description: ''
						},
						{
							optionImageUrl: '',
							id: '',
							picture: '',
							description: ''
						},
					]
				},

			}
		},

		computed: {

			...mapState('lang', {
				lang: state => state.locale
			}),

			...mapState('globalStore', {

				mainUser: ({mainUser}) => mainUser

			}),

			lstr() {
				return (str) => localString(this.lang, str);
			}


		},

		methods: {
			onSelect(boolean) {
				this.boolean = boolean
			},
			imagePreview(res, file) {

				this.imageUrl = URL.createObjectURL(file[0].raw);
				this.picture = file[0].raw
			},


			optionImagePreview(option_id, file) {

				if (file === undefined) {

				} else {

					this.pollForm.options[option_id].optionImageUrl = URL.createObjectURL(file.raw);

					this.pollForm.options[option_id].picture = file.raw;


				}
			},

			addMainPhoto() {

				if (this.imageUrl == '') {

					this.mainPicture = !this.mainPicture;


				} else {

					this.imageUrl = '';

					this.mainPicture = false;

				}

			},

			addOptionPicture() {

				if (this.optionImageUrl == '') {

					this.optionPicture = !this.optionPicture;
					console.log('start')

				} else {

					this.optionImageUrl = '';

					this.optionPicture = false;

					console.log('over')

				}

			},

			addOption() {

				this.pollForm.options.push({id: '', picture: '', description: '', optionImageUrl: ''})

			},

			deleteOption(option_id) {

				let options = this.pollForm.options;

				options.splice(option_id, 1);
			},


			submitForm(formName) {
				console.log(this.optionPicture)

				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true;
						let {pollForm, pictures, optionPicture, exception} = this;
						let options = this.pollForm.options;
						for (let option of options) {
							if (optionPicture && option.picture === "") {

								this.$message.error('загрузите фото');
								exception = true;
								pictures.length = 0;
							} else {

								pictures.push(option.picture);
								delete option.picture

							}

						}
						if (!exception) {
							let {purifyBadWords} = this,
								{end_date, end_time, subject, tags, description, options} = pollForm,
								mDate = moment(`${end_date} ${end_time}`, 'YYYY-MM-DD HH:mm');

							options.forEach(({description}, index) => {
								options[index].description = purifyBadWords(description);
							});

							let purifiedForm = {
								...pollForm,
								subject: purifyBadWords(subject),
								tags: purifyBadWords(tags),
								description: purifyBadWords(description),
								options
							};

							pollForm.end_date = mDate.toISOString(true);
							pollForm.judges = [this.mainUser.id];
							delete pollForm.end_time;
							var bodyFormData = new FormData();
							const form = new Blob([JSON.stringify(purifiedForm)], {type: "application/json"})
							bodyFormData.append('form', form)
							bodyFormData.append('file', this.picture)
							for (let pic of pictures) {
								bodyFormData.append('files[]', pic);
							}
							const config = {
								headers: {
									'content-type': 'multipart/mixed'
								}
							}
							if (pollForm.type_of_poll == 0) {

								axios.post(`${process.env.VUE_APP_MAIN_API}/rest/quiz/create`, bodyFormData, config)
									.then(response => {
										if (response.status === 200) {
											this.loading = false;
											this.$router.push({name: 'pollFeed'})
										}
									})
									.catch(err => console.log(err));


							} else {

								axios.post(`${process.env.VUE_APP_MAIN_API}/rest/admin/blockchain/create`, bodyFormData, config)
									.then(response => {
										if (response.status === 200) {
											this.loading = false;
											this.$router.push({name: 'pollFeed'})
										}
									})
									.catch(err => console.log(err));

							}


						} else {


						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},

		},

		components: {
			SwitchComponent,
			CatalogDropdown,
			IconBase,
			IconDaw,
			IconImage,
			IconRequired,
			langString,
			IconPicture,
			IconMinus,
			IconPlus
		}

	}
</script>

<style lang="scss">
	.poll-create-wrapper {
		.offchn__span {

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			line-height: 12px;
			font-variant: small-caps;
			color: #A1ABB0;

		}

		.bchn__span {


			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			line-height: 12px;
			font-variant: small-caps;
			color: #4B97B4;

		}

		.save-button {

			padding: 9px 9px;
			border-radius: 12px;
			background: #4B97B4 !important;
			color: #ffffff;

			span {

				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 12px;
				color: #FFFFFF;
				mix-blend-mode: normal;
				text-transform: uppercase;
			}
		}

		padding: 5px 18px 15px 12px;
		background: #ffffff;

		.el-textarea__inner {

			border-radius: 24px;
			overflow-y: hidden;
			resize: none;

		}

		.el-form-item__content {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;

		}

		.el-input__inner {
			border-radius: 12px;
			height: 30px;
			border-color: #B6C1C6 !important;
		}

		.el-input__inner:active, .el-input__inner:hover {

			border-color: #B6C1C6 !important;

		}


		.icon-required {

			position: absolute;
			right: 9px;

		}

		.primary {

			path {

				fill: #4B97B4;

			}

		}

		.subject-form-item {

			.icon-required {

				position: absolute;
				right: 70px !important;

			}

		}

		.icon-picture {

			width: 30px;
			height: 30px;
			border: 1px solid #B6C1C6;
			border-radius: 12px;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			margin-left: 6px;
		}

		.avatar-uploader {

			height: 265px;
			background: rgba(68, 93, 115, 0.1);
			border-radius: 12px;

			.avatar {
				height: 265px;
				border-radius: 12px;
				width: 100%;
				object-fit: cover;
			}

			.el-upload {

				width: 100%;
				height: 100%;

			}

		}

		.date-picker {

			.el-form-item {
				width: 48%;
			}

			.el-input__inner {
				height: 30px;
			}

			.el-input__prefix {

				display: none;

			}

			input {
				padding: 0 10px;
			}
		}


		.description-input {

			textarea {

				min-height: 90px !important;
				border-radius: 12px;
			}

		}

		.delete-option:first-of-type {

			display: none;

		}

		.label {

			font-family: Roboto;
			font-style: normal;
			font-weight: 300;
			line-height: 12px;
			font-size: 12px;
			text-align: justify;
			letter-spacing: -0.2px;
			color: #8A9499;

		}

		.image-block {

			margin-bottom: 9px;

		}

		.option-row {

			display: flex;
			align-items: center;

		}

		.el-form-item__label {

			@extend .label

		}

		.option-picture {

			height: 117px;
			background: rgba(68, 93, 115, 0.1);
			border-radius: 12px;
			width: 201px;
			margin-bottom: 7px;

			.option-picture-uploader, .el-upload {

				width: 100%;
				height: 100%;

				.picture {

					height: 117px;
					background: rgba(68, 93, 115, 0.1);
					border-radius: 12px;
					width: 201px;
					margin-bottom: 7px;
					object-fit: cover;

				}
			}

		}

		.more-btn {
			background: #A1ABB0;
			height: 30px;
			width: 30px;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.more-item {
			margin-bottom: 12px;

			.el-form-item__label {

				padding-left: 9px;

			}

			.el-form-item__content {

				justify-content: left;
				padding-left: 9px;

			}

		}


	}
</style>
