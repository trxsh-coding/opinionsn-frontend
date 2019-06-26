<template>
	<div class="explanation-reusable">

		<div class="explain mb-9">
			<picture-reusable class="mr-12" pic-class="mb-5" :img="explain.img" :size="27" rounded text-layout="bottom">
				<template #description>
					{{parseTime(explain.timestamp)}}
				</template>
			</picture-reusable>

			<div class="text">

				<span class="username mb-3">{{explain.username}}</span>

				<span v-show="!!explain.explain" class="explain-text mb-3">{{explain.explain}}</span>

				<div class="option">
					<span class="option-name">{{explain.option}}</span>
					<span @click="setActiveInput(1, 1)" class="ml-14 pointer">
						<icon-base
							fill="#BCBEC3"
							width="18"
							height="20"
							viewBox="0 0 18 20"
							icon-name="reply-arrow">
							<icon-reply-arrow/>
						</icon-base>
					</span>
				</div>

				<label class="mt-3" v-show="checkActiveInput(1, 1)">
					<input type="text" v-model="input_value">
					<span class="btns-block">

						<span class="emoji-span pointer" @click="emoji_menu = !emoji_menu" v-if="!mobile">
							<icon-base
								class="emoji-icon"
								fill="none"
								width="13"
								height="13"
								viewBox="0 0 15 15"
								icon-name="emoji"><icon-emoji/>
							</icon-base>
						</span>

						<div class="emoji-block" :hidden="emoji_menu">
							<VEmojiPicker :pack="emojisNative" @select="onSelectEmoji" :labelSearch="hide"/>
						</div>

						<span class="send-btn pointer">Отправить</span>
					</span>
				</label>

			</div>
		</div>

		<ul v-if="comments" class="comment-list">
			<li class="comment mb-10" v-for="(comment, index) in comments" :key="index">
				<picture-reusable class="mr-12" pic-class="mb-5" :img="comment.img" :size="27" rounded
								  text-layout="bottom">
					<template #description>
						{{parseTime(comment.timestamp)}}
					</template>
				</picture-reusable>

				<div class="text">

					<span class="username mb-3">{{comment.username}}</span>

					<span v-show="!!comment.comment" class="comment-text mb-3">{{comment.comment}}</span>

					<div class="option">
						<span class="option-name">{{comment.option}}</span>
						<span @click="setActiveInput(index + 1, 2)" class="ml-14 pointer">
							<icon-base
								fill="#BCBEC3"
								width="18"
								height="20"
								viewBox="0 0 18 20"
								icon-name="reply-arrow">
							<icon-reply-arrow/>
						</icon-base>
						</span>
					</div>

					<label class="mt-3" v-show="checkActiveInput(index + 1, 2)">
						<input type="text" v-model="input_value">
						<span class="btns-block">

							<span class="emoji-span pointer" @click="emoji_menu = !emoji_menu" v-if="!mobile">
								<icon-base
									class="emoji-icon"
									fill="none"
									width="13"
									height="13"
									viewBox="0 0 15 15"
									icon-name="emoji"><icon-emoji/>
                				</icon-base>
                			</span>

							<div class="emoji-block" :hidden="emoji_menu">
                				<VEmojiPicker :pack="emojisNative" @select="onSelectEmoji" :labelSearch="hide"/>
							</div>

							<span class="send-btn pointer">Отправить</span>
						</span>
					</label>

				</div>
			</li>
		</ul>

	</div>
</template>

<script>
	import PictureReusable from "./PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconEmoji from "../icons/IconEmoji";


	import IconReplyArrow from "../icons/IconReplyArrow";
	import VEmojiPicker from "v-emoji-picker";
	import packData from "v-emoji-picker/data/emojis.json";
	import moment from "moment";

	export default {
		name: "ExplanationReusable",
		components: {
			PictureReusable,
			IconBase,
			IconReplyArrow,
			VEmojiPicker,
			IconEmoji
		},
		data() {
			return {
				input_id: null,
				input_type: null,
				input_value: '',
				emoji_menu: true
			}
		},
		props: {
			poll_id: {
				type: Number,
				required: true
			},
			explain: {
				type: Object,
				required: true
			},
			comments: Array
		},
		methods: {
			parseTime(date) {
				return moment(date).format('HH') || "Ошибка";
			},
			onSelectEmoji(dataEmoji) {
				this.input_value += dataEmoji.emoji;
			},
			saveExplain() {

				let description = this.input_value;
				let { poll_id } = this;

				this.$store.dispatch(`pollFeed/saveExplain`, {data: {poll_id, description} });

				this.input_id = null,
				this.input_type = null,
				this.input_value = "",
				this.emoji_menu = true

			},
			saveComment() {

				let description = this.input_value;
				let { explain_id } = this.explain;
				let { poll_id } = this;

				this.$store.dispatch(`pollFeed/saveComment`, {data: {poll_id, explain_id, description}});

				this.input_id = null,
				this.input_type = null,
				this.input_value = "",
				this.emoji_menu = true
			},
			setActiveInput(id, type) {
				this.input_value = "";
				if (this.input_id === null && this.input_type === null) {
					this.input_id = id;
					this.input_type = type;
				} else if (this.input_id === id && this.input_type === type) {
					this.input_id = null;
					this.input_type = null;
				} else {
					this.input_id = id;
					this.input_type = type;
				}
			},
			checkActiveInput(id, type) {
				let {input_id, input_type} = this;
				return input_id === id && input_type === type;
			}

		},
		computed: {
			emojisNative() {
				return packData;
			},

			lstr() {
				return (str) => localString(this.lang, str);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.explanation-reusable {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		* {
			font-family: Roboto;
			font-style: normal;
		}

		.explain,
		.comment-list {

			.text {

				label {
					display: flex;
					position: relative;

					input {
						flex: 1;
						outline: none;
						padding: 5px 0 5px 15px;

						border-radius: 12px 0 0 12px;
						border: 1px solid #c0c4cc;
						border-right: none;
					}

					.btns-block {
						padding: 0 15px 0 10px;

						border-radius: 0 12px 12px 0;
						border: 1px solid #c0c4cc;
						border-left: none;

						display: flex;
						align-items: center;

						.emoji-span {
							position: relative;
							top: -1.5px;
						}

						.emoji-block {
							position: absolute;
							z-index: 2000;
							top: 110%;
							right: 0;
						}

						.send-btn {
							margin-left: 8px;

							font-family: Roboto;
							font-size: 12px;
							font-style: normal;
							font-weight: 400;
							text-transform: uppercase;
							color: #B9C0C4;
						}
					}
				}

			}

		}

		.explain {
			display: flex;
			align-items: flex-start;
			width: 100%;

			.text {
				flex: 1;

				display: flex;
				flex-direction: column;

				.username {
					font-weight: bold;
					font-size: 13px;
					color: #1A1E22;
				}

				.comment-text {
					font-weight: normal;
					font-size: 13px;
					color: #1A1E22;
				}

				.option {
					display: flex;
					justify-content: space-between;

					.option-name {
						font-weight: normal;
						font-size: 12px;
						color: #4B97B4;
					}
				}
			}

		}

		.comment-list {
			position: relative;
			width: 80%;

			.comment {
				display: flex;
				align-items: flex-start;
				width: 100%;

				.text {
					flex: 1;

					display: flex;
					flex-direction: column;

					.username {
						font-weight: bold;
						font-size: 13px;
						color: #1A1E22;
					}

					.explain-text {
						font-weight: normal;
						font-size: 13px;
						color: #1A1E22;
					}

					.option {
						display: flex;
						justify-content: space-between;

						.option-name {
							font-weight: normal;
							font-size: 12px;
							color: #4B97B4;
						}
					}
				}
			}

		}

	}
</style>