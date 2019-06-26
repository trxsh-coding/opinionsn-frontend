<template>
    <div class="explanation-reusable">

		<div class="explain mb-9">
			<picture-reusable class="mr-12" pic-class="mb-5" :img="explain.img" :size="27" rounded text-layout="bottom">
				<template #description>
					17ч.
				</template>
			</picture-reusable>

			<div class="text">

				<span class="username mb-3">{{explain.username}}</span>

				<span v-show="!!explain.explain" class="explain-text mb-3">{{explain.explain}}</span>

				<div class="option">
					<span class="option-name">{{explain.option}}</span>
					<icon-base
						class="ml-14 pointer"
						fill="#BCBEC3"
						width="18"
						height="20"
						viewBox="0 0 18 20"
						icon-name="reply-arrow">
						<icon-reply-arrow />
					</icon-base>
				</div>

			</div>
		</div>

		<ul v-if="comments" class="comment-list">
			<li class="comment mb-10" v-for="(comment, index) in comments" :key="index">
				<picture-reusable class="mr-12" pic-class="mb-5" :img="comment.img" :size="27" rounded text-layout="bottom">
					<template #description>
						17ч.
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
							<icon-reply-arrow />
						</icon-base>
						</span>
					</div>

					<label v-show="checkActiveInput(index + 1, 2)">
						<input type="text" v-model="input_value">
					</label>

				</div>
			</li>
		</ul>

	</div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconReplyArrow from "../icons/IconReplyArrow";

	export default {
        name: "ExplanationReusable",
		components: {
        	PictureReusable,
			IconBase,
			IconReplyArrow
		},
		data() {
			return {
				active_input_id: null,
				input_type: null,
				input_value: ''
			}
		},
		props: {
        	explain: {
        		type: Object,
				required: true
			},
			comments: Array
		},
		methods: {
			toogleDialogEmoji() {
				this.dialogHidden = !this.dialogHidden;
			},
			onSelectEmoji(dataEmoji) {
				this.comment_description += dataEmoji.emoji;
			},

			saveComment(poll_id, explain_id){

				let description = this.purifyBadWords(this.comment_description);

				this.$store.dispatch(`pollFeed/saveComment`, {data: {poll_id, explain_id, description} });

				this.comment_description = ''
			},
			setActiveInput(id, type) {
				if (this.active_input_id === null && this.input_type === null) {
					this.active_input_id = id;
					this.input_type = type;
				} else {
					this.active_input_id = null;
					this.input_type = null;
				}
			},
			checkActiveInput(id, type) {
				let { active_input_id, input_type } = this;
				return active_input_id === id && input_type === type;
			}

		},
		computed: {
			emojisNative() {
				return packData;
			},

			lstr(){
				return (str)=>localString(this.lang, str);
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