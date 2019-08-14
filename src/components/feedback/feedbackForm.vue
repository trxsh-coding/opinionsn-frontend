<template>
	<div class="feedback-form">
		<div class="feedback-header">
			<span>
				Вы находитесь на тестовой версии первой crowd wisdom платформы на основе технологии Blockchain.
				<br>
				<br><b>Opinion</b> — это социальная сеть, где пользователи участвуют в опросах, делятся мнениями, предсказывают исход событий и получают вознаграждения за точные прогнозы.
				<br>
				<br>Мы будем Вам благодарны за оставленный отзыв по работе системы или предложение по ее улучшению.
				Отзыв можно оставить, заполнив форму или отправив нам сообщение в социальных сетях.
			</span>
		</div>
		<div class="form-section mt-15">
			<div class="social-media mt-20">
				<ul class="soc-media mt-5">
					<li>
						<a href="https://www.facebook.com/opinionsncom/" target="_blank" rel="noopener noreferrer">
							<div
									class="picture-30x30"
									:style="{ 'background-image': 'url(' + require('../images/facebook.png') + ')' } "
							></div>
						</a>
					</li>
					<li>
						<a href="https://twitter.com/Opinionsncom" target="_blank" rel="noopener noreferrer">
							<div
									class="picture-30x30"
									:style="{ 'background-image': 'url(' + require('../images/twitter.png') + ')' } "
							></div>
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/opinionsncom" target="_blank" rel="noopener noreferrer">
							<div
									class="picture-30x30"
									:style="{ 'background-image': 'url(' + require('../images/instagram.png') + ')' } "
							></div>
						</a>
					</li>
					<li>
						<a href="https://t.me/opinion_social_network" target="_blank" rel="noopener noreferrer">
							<div
									class="picture-30x30"
									:style="{ 'background-image': 'url(' + require('../images/telegram.png') + ')' } "
							></div>
						</a>
					</li>
					<li>
						<a href="https://vk.com/opinionsncom" target="_blank" rel="noopener noreferrer">
							<div
									class="picture-30x30"
									:style="{ 'background-image': 'url(' + require('../images/vk.png') + ')' } "
							></div>
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
							></div>
						</a>
					</li>
				</ul>
			</div>
			<div class="form max-width">


				<input-reusable :value="feedbackForm.email"
								input
								class="mt-20 mb-12 flex-between"
								width="100%"
								:input-placeholder="'email'"/>

				<input-reusable :value="feedbackForm.email"
								textarea=""
								class="mt-40 mb-12 flex-between"
								width="100%"
								height="100px"
								:input-placeholder="'message_text'"/>

				<button-reusable
						class="v-center auth-btn mt-9 py-13"
						description="registration"
						font-size="16"
						bor-rad="6"
						bg-color="#4B97B4"
						color="#ffffff"/>
			</div>


		</div>

	</div>
</template>

<script>
	import axios from "axios";
	import InputReusable from "../reusableСomponents/InputReusable";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	export default {
		name: "feedbackForm",
		components: {ButtonReusable, InputReusable},
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
				let bodyFormData = new FormData();
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
		border-radius: 6px;
		text-align: left;
		.feedback-header {
			padding: 15px;
			border-radius: 6px;
			background: #FFFFFF;
		}
		span {

			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			color: #152D3A;


		}

		.form-section {
			display: flex;
			background: #FFFFFF;
			padding: 15px;

		}

		.soc-media {
			margin: 0;
			margin-top: 5px;
			padding: 0;
			display: flex;
			flex-direction: column;
			width: max-content;
			div {
				border-radius: 50px;
			}
			li {
				list-style-type: none;
				margin-right: 15px;
				padding-bottom: 9px;
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
