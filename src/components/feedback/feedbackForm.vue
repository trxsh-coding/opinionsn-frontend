<template>
	<div class="feedback-form">
		<div class="feedback-header">
			<span>
				Вы находитесь на тестовой версии первой crowd wisdom платформы на основе технологии Blockchain.
				<br>
				<br>Opinion — это социальная сеть, где пользователи участвуют в опросах, делятся мнениями, предсказывают исход событий и получают вознаграждения за точные прогнозы.
				<br>
				<br>Мы будем Вам благодарны за оставленный отзыв по работе системы или предложение по ее улучшению.
				Отзыв можно оставить, заполнив форму или отправив нам сообщение в социальных сетях.
			</span>
		</div>
		<div class="form-section mt-15">
			<el-form v-model="feedbackForm" ref="feedbackForm">
				<el-form-item>
					<el-input placeholder="E-mail" v-model="feedbackForm.email"/>
				</el-form-item>

				<el-form-item>
					<el-input
						class="message"
						placeholder="Текст сообщения"
						type="textarea"
						v-model="feedbackForm.description"
					/>
				</el-form-item>

				<div class="button-section flex-space-start">
					<el-button class="primary-btn" @click.prevent="submitForm(feedbackForm)" size="small">Отправить</el-button>
					<el-upload
						class="upload-demo"
						multiple
						:before-remove="beforeRemove"
						:auto-upload="false"
						:limit="3"
						:on-change="handlePreview"
						ref="upload"
					>
						<el-button type="primary" size="small">Прикрепить изображения</el-button>
					</el-upload>
				</div>
			</el-form>
		</div>

		<ul class="soc-media mt-5">
			<li>
				<a href="https://www.facebook.com/opinionsncom/" target="_blank" rel="noopener noreferrer">
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/facebook.png') + ')' } "
					/>
				</a>
			</li>
			<li>
				<a href="https://twitter.com/opinionsn_com" target="_blank" rel="noopener noreferrer">
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/twitter.png') + ')' } "
					/>
				</a>
			</li>
			<li>
				<a href="https://www.instagram.com/opinionsn_com/" target="_blank" rel="noopener noreferrer">
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/instagram.png') + ')' } "
					/>
				</a>
			</li>
			<li>
				<a href="https://t.me/opinionsn_com" target="_blank" rel="noopener noreferrer">
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/telegram.png') + ')' } "
					/>
				</a>
			</li>
			<li>
				<a href="https://vk.com/opinion_social_network" target="_blank" rel="noopener noreferrer">
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/vk.png') + ')' } "
					/>
				</a>
			</li>
			<li>
				<a
					href="https://www.youtube.com/channel/UClapvCFqBLMO8vjAPv4KohQ?view_as=subscriber"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div
						class="picture-30x30"
						:style="{ 'background-image': 'url(' + require('../images/youtube.png') + ')' } "
					/>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "feedbackForm",
		data() {
			return {
				pictures: [],
				feedbackForm: {
					email: "",
					description: ""
				}
			};
		},
		methods: {
			handlePreview(file) {
				this.pictures.push(file);
			},
			submitForm(formName) {
				var bodyFormData = new FormData();
				let { pictures } = this;
				const form = new Blob([JSON.stringify(formName)], {
					type: "application/json"
				});
				bodyFormData.append("form", form);
				for (let pic of pictures) {
					bodyFormData.append("files[]", pic.raw);
				}
				const config = {
					headers: {
						"content-type": "multipart/mixed"
					}
				};

				axios
					.post(`${process.env.VUE_APP_MAIN_API}/feedback`, bodyFormData, config)
					.then(response => {
						console.log(response.status);
						if (response.status === 200) {
							this.loading = false;

							this.pictures = [];
							this.feedbackForm = {
								email: "",
								description: ""
							};

							this.$message({
								showClose: true,
								message: "Сообщение отправлено!",
								type: "success"
							});
						}
					})
					.catch(() => {
						this.loading = false;

						this.pictures = [];
						this.feedbackForm = {
							email: "",
							description: ""
						};

						this.$message.error({
							showClose: true,
							message: "Произошла ошибка при отправке!"
						});
					});
			},
			beforeRemove(azfile, fileList) {
				let { uid } = file;

				for (let i = 0; i < this.pictures.length; i++) {
					if (this.pictures[i].uid === uid) this.pictures.splice(i, 1);
				}
			}
		}
	};
</script>

<style lang="scss">
	.feedback-form {
		padding: 20px;
		border-radius: 6px;
		background: #ffffff;
		text-align: center;

		span {
			font-family: Roboto;
			font-style: normal;
			font-weight: 300;
			font-size: 14px;
			color: #152d3a;
			padding-right: 6px;
		}
		.form-section {
			.el-input__inner,
			.el-textarea__inner {
				border-radius: 24px !important;
			}

			.el-textarea__inner {
				height: 160px;
				resize: none;
			}

			.button-section {
				min-height: 60px;

				span {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 14px;
					letter-spacing: -0.1px;
					color: #ffffff;
					font-variant-caps: all-petite-caps;
					border-radius: 6px;
				}

				.el-button {
					border-radius: 24px !important;
				}

				.el-upload-list {
					* {
						z-index: 30000;
					}
				}
			}

			// @media only screen and (max-device-width: 700px) {
			// 	.button-section {
			// 		min-height: 195px;
			// 		flex-direction: column;
			// 		align-items: center;
			// 		justify-content: flex-start;

			// 		.upload-demo {
			// 			margin-top: 14px;
			// 		}
			// 	}
			// }
		}

		.soc-media {
			margin: 0;
			margin-top: 5px;
			padding: 0;
			display: flex;
			width: max-content;
			div {
				border-radius: 50px;
			}
			li {
				list-style-type: none;
				margin-right: 15px;

				&:last-child {
					margin: 0;
				}
			}
		}

		@media only screen and (max-device-width: 700px) {
			.soc-media {
				margin: 0 auto;
			}
		}
	}
</style>
