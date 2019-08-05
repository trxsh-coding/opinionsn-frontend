<template>
	<div class="explanation-reusable">
		
		<div class="explain mb-9">
			<picture-reusable
					v-if="!without_avatar"
					class="ml-18 mr-12 p-0"
					:class="{'ml-21': mobile}"
					pic-class="mb-5"
					:img="fitExplain.avatar"
					:size="27"
					rounded
					text-layout="bottom">
				<template #description>
					<time-trans short-time :time="fitExplain.timestamp"></time-trans>
				</template>
			</picture-reusable>
			
			<div class="text">
				
				<span class="username mb-3">{{fitExplain.username}}</span>
				
				<span v-show="!!fitExplain.description"
				      class="explain-description mb-3">{{fitExplain.description}}</span>
				
				<div class="option">
					<span class="option-name">{{fitExplain.option}}</span>
					<span v-show="!input_id" @click="setActiveInput(1, 1)" class="pointer">
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
				
				<label class="mt-3" v-if="checkActiveInput(1, 1)">
					<textarea-autosize
							@keyup.esc.native.exact="setActiveInput(null, null)"
							@keyup.enter.native.prevent.exact="save"
							@keyup.enter.ctrl.native.exact="newline"
							v-model="input_value"
					></textarea-autosize>
					<span class="btns-block">

<!--						<span class="emoji-span pointer" @click="emoji_menu = !emoji_menu">-->
						<!--							<icon-base-->
						<!--								class="emoji-icon"-->
						<!--								fill="none"-->
						<!--								width="13"-->
						<!--								height="13"-->
						<!--								viewBox="0 0 15 15"-->
						<!--								icon-name="emoji"><icon-emoji/>-->
						<!--							</icon-base>-->
						<!--						</span>-->
						
						<!--						<div class="emoji-block" :hidden="emoji_menu">-->
						<!--							<VEmojiPicker :pack="emojisNative" @select="onSelectEmoji"/>-->
						<!--						</div>-->

						<span
								@click="save"
								class="pointer">
							<icon-base
									class="send-btn"
									fill="#BCBEC3"
									width="18"
									height="20"
									viewBox="0 0 18 20"
									icon-name="reply-arrow">
								<icon-reply-arrow/>
							</icon-base>
						</span>

					</span>
				</label>
			
			</div>
		</div>
		
		<ul v-if="comments && fitComments" class="comment-list">
			<li class="comment mb-10" v-for="(comment, index) in fitComments" :key="comment.id">
				
				<picture-reusable class="mr-12" pic-class="mb-5" :img="comment.avatar" :size="27" rounded
				                  text-layout="bottom">
					<template #description>
						<time-trans short-time :time="comment.timestamp"></time-trans>
					</template>
				</picture-reusable>
				
				<div class="text">
					
					<span class="username mb-3">{{comment.username}}</span>
					
					<span v-show="!!comment.description" class="comment-description mb-3">{{comment.description}}</span>
					
					<div class="option">
						<span class="option-name">{{comment.option}}</span>
						<span v-show="!input_id" @click="setActiveInput(index + 1, 2)" class="pointer">
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
					
					<label class="mt-3" v-if="checkActiveInput(index + 1, 2)">
						<textarea-autosize
								@keyup.esc.native.exact="setActiveInput(null, null)"
								@keyup.enter.native.prevent.exact="saveComment"
								@keyup.enter.ctrl.native.exact="newline"
								v-model="input_value"
								autosize
						></textarea-autosize>
						<span class="btns-block">

<!--							<span class="emoji-span pointer" @click="emoji_menu = !emoji_menu">-->
							<!--								<icon-base-->
							<!--									class="emoji-icon"-->
							<!--									fill="none"-->
							<!--									width="13"-->
							<!--									height="13"-->
							<!--									viewBox="0 0 15 15"-->
							<!--									icon-name="emoji"><icon-emoji/>-->
							<!--                				</icon-base>-->
							<!--                			</span>-->
							
							<!--							<div class="emoji-block" :hidden="emoji_menu">-->
							<!--                				<VEmojiPicker :pack="emojisNative" @select="onSelectEmoji"/>-->
							<!--							</div>-->

							<span
									@click="saveComment"
									class="pointer">
								<icon-base
										class="send-btn"
										fill="#BCBEC3"
										width="18"
										height="20"
										viewBox="0 0 18 20"
										icon-name="reply-arrow">
									<icon-reply-arrow/>
								</icon-base>
							</span>

						</span>
					</label>
				
				</div>
			</li>
			
			<span v-show="!no_more_comments && fitComments.length > 5" class="comments-load-btn pointer mt-9"
			      @click="loadMoreComments">Загрузить ещё...</span>
		</ul>
	
	
	</div>
</template>

<script>
	import PictureReusable from "./PictureReusable";
	import IconBase from "../icons/IconBase";
	import IconEmoji from "../icons/IconEmoji";
	import timeTrans from "../timeTrans";
	import IconReplyArrow from "../icons/IconReplyArrow";
	import VEmojiPicker from "v-emoji-picker";
	import packData from "v-emoji-picker/data/emojis.json";
	import {mapState} from "vuex";
	
	export default {
		name: "ExplanationReusable",
		components: {
			PictureReusable,
			IconBase,
			IconReplyArrow,
			VEmojiPicker,
			IconEmoji,
			timeTrans
		},
		
		data() {
			return {
				mobile: this.$root.mobile,
				input_id: null,
				input_type: null,
				input_value: '',
				emoji_menu: true,
				no_more_comments: false,
				comment_page: 1,
				COMMENTS_LIMIT: 5,
				comments_quantity: 5,
				publicPath: process.env.VUE_APP_MAIN_API
			}
		},
		props: {
			pollId: {
				type: Number,
				required: true
			},
			pollType: Number,
			explain: {
				type: Object,
				required: true
			},
			without_avatar: {
				type: Boolean
			},
			comments: Object,
			options: {
				type: Object,
				required: true
			},
			users: {
				type: Object,
				required: true
			}
			
		},
		methods: {
			
			newline() {
				this.input_value = `${this.input_value}\n`;
			},
			
			onSelectEmoji(dataEmoji) {
				this.input_value += dataEmoji.emoji;
			},
			
			save() {
				
				let {explain, main_user_id} = this;
				
				if (explain.author_id === main_user_id) {
					if (!!explain.explain_description) {
						this.saveComment()
					} else {
						this.saveExplain()
					}
				} else {
					this.saveComment()
				}
				
				
			},
			
			saveExplain() {
				
				let description = this.input_value;
				
				if (description) {
					
					let {pollId: poll_id} = this;
					this.$store.dispatch(`pollFeed/saveExplain`, {data: {poll_id, description}});
					
					this.input_id = null;
					this.input_type = null;
					this.input_value = "";
					this.emoji_menu = true;
					
				} else {
					
					this.input_id = null;
					this.input_type = null;
					this.input_value = "";
					this.emoji_menu = true;
					
				}
				
			},
			saveComment() {
				let description = this.input_value;
				
				if (description) {
					
					let {id: explain_id} = this.explain;
					
					this.$store.dispatch(`pollFeed/saveComment`, {data: {explain_id, description}});
					
					this.input_id = null;
					this.input_type = null;
					this.input_value = "";
					this.emoji_menu = true;
					
				} else {
					
					this.input_id = null;
					this.input_type = null;
					this.input_value = "";
					this.emoji_menu = true;
					
				}
				
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
			},
			loadMoreComments() {
				
				let {
					no_more_comments,
					comment_page,
					COMMENTS_LIMIT,
					comments_quantity,
					explain,
					pollType
				} = this;
				
				if (!no_more_comments) {
					
					if (pollType === 2) {
						
						this.$store.dispatch(`pollFeed/loadComments`, {
							customUrl: `/rest/blockchain/comment`, params: {explain_id: explain.id, comment_page}
						}).then(() => {
							this.comment_page += 1;
							if (comments_quantity > this.explain.comments_id.length) {
								this.no_more_comments = true;
							} else {
								this.comments_quantity += COMMENTS_LIMIT;
							}
						});
						
						
					} else {
						
						this.$store.dispatch(`pollFeed/loadComments`, {vm: this, explain_id: explain.id, comment_page})
							.then(() => {
								this.comment_page += 1;
								if (comments_quantity > this.explain.comments_id.length) {
									this.no_more_comments = true;
								} else {
									this.comments_quantity += COMMENTS_LIMIT;
								}
							});
						
					}
					
				}
				
			}
			
		},
		computed: {
			
			...mapState('globalStore', {
				main_user_id: s => s.mainUser.id
			}),
			
			emojisNative() {
				return packData;
			},
			
			lstr() {
				return (str) => localString(this.lang, str);
			},
			
			fitExplain() {
				let {users, explain, options, publicPath} = this;
				let {author_id, explain_description, create_time, id, selected_variable} = explain;
				
				return {
					id,
					avatar: publicPath + users[author_id].path_to_avatar,
					username: users[author_id].username,
					description: explain_description,
					option: options[selected_variable].description,
					timestamp: create_time
				}
			},
			
			fitComments() {
				let {users, comments, explain, options, publicPath} = this;
				
				let fitComments = [];
				
				let {comments_id} = explain;
				
				comments_id.forEach((id, index) => {
					
					if (!comments[id]) return;
					
					let {
						author_id,
						description,
						option_id,
						create_time
					} = comments[id];
					
					fitComments[index] = {
						avatar: publicPath + users[author_id].path_to_avatar,
						username: users[author_id].username,
						description: description,
						option: options[option_id].description,
						timestamp: create_time
					};
					
				});
				
				return !!comments_id.length ? fitComments : null;
				
			},
		}
	}
</script>

<style lang="scss">
	.explanation-reusable {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		
		* {
			font-family: Roboto;
			font-style: normal;
		}
		
		& > .explain,
		& > .comment-list {
			/*min-height: 60px;*/
			align-items: stretch;
			
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				label {
					display: flex;
					position: relative;
					background: #FFFFFF;
					border: 1px solid #BCBEC3;
					box-sizing: border-box;
					border-radius: 6px;
					overflow: hidden;
					
					textarea {
						flex: 1;
						outline: none;
						padding: 7px 9px;
						border: none;
						
						font-family: Roboto;
						font-style: normal;
						font-weight: normal;
						font-size: 13px;
						color: #1A1E22;
					}
					
					.btns-block {
						
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
							margin: 0 9px;
						}
					}
				}
				
			}
			
		}
		
		.explain {
			display: flex;
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
				
				.comment-description,
				.explain-description {
					font-weight: normal;
					font-size: 13px;
					color: #1A1E22;
				}
				
				.option {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					
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
			display: flex;
			flex-direction: column;
			
			.comments-load-btn {
				font-family: Helvetica Neue, Roboto;
				font-size: 10px;
				color: #BEC0C5;
				margin: 0 auto;
			}
			
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
