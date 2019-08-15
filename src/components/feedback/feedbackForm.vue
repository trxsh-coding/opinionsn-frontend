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

		<div class="form">
			<span class="feedback-span">Обратная связь</span>
			<div class="form-section mt-15">
				<div class="form-block max-width">


					<input-reusable :value="feedbackForm.email"
									input
									class=" mb-12 flex-between"
									width="100%"
									:input-placeholder="'email'"/>

					<input-reusable :value="feedbackForm.email"
									textarea
									class="mt-15 mb-12 flex-between"
									width="100%"
									:input-placeholder="'message_text'"/>
					<span class="insert-pic-span">Прикрепить изображения</span>
					<div class="picture-section flex">
						<upload-reusable
								class="pr-15"
								description
								image-preview
								pre-width="60"
								:pre-height="60"
								:value="pictures"
								@upload="({file}) => {updateArrayPictures(file, index)}">

						</upload-reusable>
						<add-reusable class="mt-15"/>
					</div>
					<button-reusable
							class="v-center auth-btn mt-9 py-13 w-fit h-fit pl-3 pr-3"

							description="send"
							font-size="11"
							bor-rad="6"
							bg-color="#4B97B4"
							color="#ffffff"/>
				</div>


			</div>


		</div>
		<div class="social-media">
			<ul class="soc-media">
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

	</div>
</template>

<script>
	import axios from "axios";
	import InputReusable from "../reusableСomponents/InputReusable";
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	import IconBase from "../icons/IconBase";
	import IconUpload from "../icons/create/IconUpload";
	import UploadReusable from "../reusableСomponents/UploadReusable";
	import AddOptionBlock from "../create/addOptionBlock";
	import AddReusable from "../create/addReusable";
	export default {
		name: "feedbackForm",
		components: {AddReusable, AddOptionBlock, UploadReusable, IconBase, IconUpload, ButtonReusable, InputReusable},
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

		}

		.form {
			margin-top: 15px;
			background: #FFFFFF;
			padding: 15px;
			.insert-pic-span {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				color: #8A9499;


			}
			.feedback-span {
				font-family: Roboto;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				color: #152D3A;
				text-transform: uppercase;


			}
			.form-section {
				display: flex;
			}
		}

		.soc-media {
			margin: 0;
			width: max-content;
			padding-left: 15px;
			margin-top: 15px;
			background: #FFFFFF;
			display: flex;
			width: 100%;
			div {
				border-radius: 6px;
			}
			ul {
				display: flex;
			}
			li {
				list-style-type: none;
				margin-right: 15px;
				padding-top: 10px;
				padding-bottom: 10px;
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
