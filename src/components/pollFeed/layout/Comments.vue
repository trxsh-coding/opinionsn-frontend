<template>
	<section class="comments-section">
		<div v-if="!haveExplain" class="input-panel text-deselect px-15 py-10 mt-12 flex-align-center"
		     :class="{pointer: !isVoted}" :style="{width: `calc(100% + ${$root.mobile ? '20px' : '12px'})`}"
		     @click="handleUnvotedInputPanelClick">

			<router-link v-if="isAuthorized" class="flex w-30 mr-15 pointer" :to="getUserLink(mainUser.id)">
				<RePicture :url="mainUser.path_to_avatar | addAssetsPath" size="30" rounded/>
			</router-link>

			<ReInput @keyup.esc.native.exact="clearInput('explainInputValue')"
			         @keyup.enter.native.prevent.exact="saveInputValue('explainInputValue', 'EXPLAIN')"
			         @keyup.enter.ctrl.native.exact="insertNewLine('explainInputValue')"
			         v-if="isVoted" :preset="3" textarea
			         class="input-label fx-1" input-class="input fx-1 py-7 pr-0"
			         v-model="explainInputValue" :placeholder="lstr('explain_your_opinion')">
				<button @click="saveInputValue('explainInputValue', 'EXPLAIN')" class="send-button px-10 pt-4">
					<IconSend/>
				</button>
			</ReInput>

			<span v-else class="mx-auto">
                <IconTopArrow class="mr-7"/>
                Ответь и узнай, что думают другие
            </span>

		</div>
		<div v-if="isVoted" class="comments-block py-17 pb-10">
			<div class="header pl-60 flex-column">
				<span class="title">{{lstr('opinions')}}</span>
				<div class="switches flex mt-7">
					<button class="flex-column" :class="{'active': explainsFilterType === 'ALL'}"
					        @click="filteredExplainsWithComments = 'ALL'">
						{{lstr('all')}}
						<span class="hr h-2"></span>
					</button>
					<button class="flex-column ml-15" :class="{'active': explainsFilterType === 'FRIENDS'}"
					        @click="filteredExplainsWithComments = 'FRIENDS'">
						{{lstr('friends')}}
						<span class="hr h-2"></span>
					</button>
					<button class="flex-column ml-15" :class="{'active': explainsFilterType === 'MINE'}"
					        @click="filteredExplainsWithComments = 'MINE'">
						{{lstr('mine')}}
						<span class="hr h-2"></span>
					</button>
				</div>
			</div>

			<div class="feed flex-column mt-6">
				<div class="item flex-column mt-15" v-for="(e, index) in filteredExplainsWithComments"
				    :key="e.id">
					<div class="explain flex" :ref="'explain_' + e.id">
						<div class="avatar-wrapper w-60 flex-column pt-3">
							<router-link class="flex mx-auto pointer" :to="getUserLink(e.author.id)">
								<RePicture :url="e.author.avatar | addAssetsPath" size="30" rounded/>
							</router-link>
						</div>

						<div class="text fx-1 flex-column">
							<span class="flex-align-center">
								<span class="username">{{e.author.username}}</span>
								<TimeTrans class="timestamp ml-7" :short-time="true"
								           :time="e.create_time"></TimeTrans>
							</span>

							<span class="description mt-3">{{e.explain_description}}</span>

							<span class="option mt-5">{{e.opinionOption}}</span>

							<div class="reply-panel flex fx-1 mt-7">
								<ReInput @keyup.esc.native.exact="clearInput('commentInputValue', true)"
								         @keyup.enter.native.prevent.exact="saveInputValue('commentInputValue', 'COMMENT', e.id)"
								         @keyup.enter.ctrl.native.exact="insertNewLine('commentInputValue')"
								         v-if="activeInputId === e.id" class="input-label fx-1"
								         input-class="input fx-1 py-7 pr-0" :preset="3" textarea
								         v-model="commentInputValue" :placeholder="lstr('leave_a_comment')">
									<button @click="saveInputValue('commentInputValue', 'COMMENT', e.id)"
									        class="send-button px-10 pt-4">
										<IconSend/>
									</button>
								</ReInput>

								<button v-else @click="activeInputId = e.id"
								        class="reply-btn flex-align-center">
									<IconReplyArrow class="mr-4"/>
									{{lstr('reply')}}
								</button>
							</div>

						</div>
					</div>

					<div class="comment-list ml-45">
						<div class="comment flex mt-15" v-for="c in e.comments" :key="c.id">
							<div class="avatar-wrapper w-60 flex-column pt-3">
								<router-link class="flex mx-auto pointer" :to="getUserLink(c.author.id)">
									<RePicture :url="c.author.avatar | addAssetsPath" size="30" rounded/>
								</router-link>
							</div>

							<div class="text fx-1 flex-column">
									<span class="flex-align-center">
										<span class="username">{{c.author.username}}</span>
										<TimeTrans class="timestamp ml-7" :short-time="true"
										           :time="c.create_time"></TimeTrans>
									</span>

								<span class="description mt-3">{{c.description}}</span>

								<span class="option mt-5">{{c.opinionOption}}</span>

								<div class="reply-panel flex fx-1 mt-7">
									<ReInput @keyup.esc.native.exact="clearInput('commentInputValue', true)"
									         @keyup.enter.native.prevent.exact="saveInputValue('commentInputValue', 'COMMENT', e.id)"
									         @keyup.enter.ctrl.native.exact="insertNewLine('commentInputValue')"
									         v-if="activeInputId === c.id" class="input-label fx-1"
									         input-class="input fx-1 py-7 pr-0" :preset="3" textarea
									         v-model="commentInputValue" :placeholder="lstr('leave_a_comment')">
										<button @click="saveInputValue('commentInputValue', 'COMMENT', e.id)"
										        class="send-button px-10 pt-4">
											<IconSend/>
										</button>
									</ReInput>

									<button v-else @click="activeInputId = c.id"
									        class="reply-btn flex-align-center">
										<IconReplyArrow class="mr-4"/>
										{{lstr('reply')}}
									</button>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="something" ref="something">

				</div>
				<span class="comments-load-btn pointer mt-12 mx-auto uppercase"
				      v-if="commentsLoadBtnCondition" @click="increaseAmountOfVisibleComments">
                    <IconBottomArrow class="mr-4"/>
                    Загрузить еще комментарии
                </span>

				<Loader v-if="loaderCondition" class="mx-auto"/>
			</div>
		</div>
	</section>
</template>

<script>
	import RePicture from "@/components/reusableСomponents/RePicture";
	import IconTopArrow from "@/components/icons/IconTopArrow";
	import ReInput from "@/components/reusableСomponents/ReInput";
	import langMixin from "@/components/mixins/langMixin";
	import IconSend from "@/components/icons/IconSend";
	import IconReplyArrow from "@/components/icons/IconReplyArrow";
	import TimeTrans from "@/components/timeTrans";
	import ElementScrollHandler from "@/components/mixins/ElementScrollHandler";
	import Loader from "@/components/reusableСomponents/Loader";
	import IconBottomArrow from "@/components/icons/IconBottomArrow";

	export default {
		name: "Comments",

		components: {IconBottomArrow, Loader, TimeTrans, IconReplyArrow, IconSend, ReInput, IconTopArrow, RePicture},

		props: {
			isAuthorized: Boolean,
			isVoted: Boolean,
			pollId: Number,
			haveExplain: Boolean,
			mainUser: Object,
			explainsWithComments: Array
		},

		mixins: [langMixin, ElementScrollHandler],

		data() {
			return {
				explainInputValue: '',
				commentInputValue: '',
				activeInputId: '',
				explainsFilterType: 'ALL',
				amountOfVisibleComments: 5,
				timeoutId: null
			}
		},

		watch: {
			// Increase amountOfVisibleComments quantity when page scrolled to bottom
			rootScrollTop() {
				// this.setScrollDifference(document.documentElement, 126, null);
				// if (this.scrolled_to_bottom) {
				// 	this.increaseAmountOfVisibleComments()
				// }
			}
		},

		methods: {
			scrollToComment(){
				console.log(this.$refs['explain_159883'])

			},
			handleUnvotedInputPanelClick() {

				if (!this.isVoted) {

					let f = () => {
						let self = this;
						return function(trigger) {
							if (!self.timeoutId) {
								this[trigger] = true;
								self.timeoutId = setTimeout(() => {
									this[trigger] = false;
									self.timeoutId = null;
								}, 700);
							}
						}
					};

					this.$emit('InputPanelClicked', f())
				}

			},

			getUserLink(id) {
				return {name: 'user', params: {id}}
			},
			handleRedirectFromBows(){
				const {voteId, withScroll} = this.$route.query;
				this.activeInputId = voteId;
				this.$refs[`explain_${voteId}`][0].scrollIntoView({behavior: "smooth", alignToTop:true})
			},
			saveInputValue(value, type, explain_id) {
				if (this[value] && type) {
					if (type === 'EXPLAIN') {
						this.$store.dispatch(`pollFeed/saveExplain`, {
							data: {
								poll_id: this.pollId,
								description: this[value]
							}
						});
						this.clearInput(value)
					} else if (type === 'COMMENT') {
						this.$store.dispatch(`pollFeed/saveComment`, {data: {explain_id, description: this[value], poll_id: this.pollId}});
						this.clearInput(value, true);
					}
				}
			},

			increaseAmountOfVisibleComments() {
				if (this.amountOfVisibleComments < this.explainsWithComments.length) {
					this.amountOfVisibleComments += 5
				}
			},

			clearInput(value, clearActiveInputId) {
				if (value) this[value] = '';
				if (clearActiveInputId) this.activeInputId = '';
			},

			insertNewLine(inputKey) {
				this[inputKey] = `${this[inputKey]}\n`;
			},

		},

		computed: {
			// Filter explainsWithComments
			filteredExplainsWithComments: {
				get() {
					let {explainsFilterType, explainsWithComments} = this;

					switch (explainsFilterType) {
						case "ALL":
							return explainsWithComments;
						case "FRIENDS":
						case "MINE":
							let filtered = [];
							let type = explainsFilterType === "FRIENDS" ? "isFriend" : "isMine";

							for (let item of explainsWithComments) {
								if (item[type]) {
									filtered.push(item);
								}
							}

							return filtered;
					}
				},
				set(filterType) {
					this.explainsFilterType = filterType;
				}
			},

			// Get root scroll top value to use it changes is trigger
			// rootScrollTop() {
			// 	return this.$root.scroll_top;
			// },

			isSinglePoll() {
				return this.$route.name === 'singlePoll'
			},

			loaderCondition() {
				return this.isSinglePoll && this.amountOfVisibleComments < this.filteredExplainsWithComments.length
			},

			commentsLoadBtnCondition() {
				return !this.isSinglePoll
					&& this.filteredExplainsWithComments.length > 5
					&& this.amountOfVisibleComments < this.filteredExplainsWithComments.length
			}
		},

		mounted() {
			// this.setScrollDifference(document.documentElement, 126, null);

			if(this.$route.query.withScroll) setTimeout(() => this.handleRedirectFromBows(), 1000);
		}

	}
</script>

<style lang="scss">
	.comments-section {
		position: relative;
		width: 100%;

		button {
			all: unset;
			cursor: pointer;
		}

		.comments-load-btn {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 11px;
			color: #1A1E22;
		}

		.input-panel {
			min-height: 50px;
			background: #eaebec;
			border-radius: 0 6px 6px 0;

			span {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				color: #6F747F;
			}
		}

		.input-label {
			border: 1px solid #BCBEC3;
			border-radius: 6px;
			background: #FFFFFF;

			.input {
				outline: none;
				border: none;
			}

			.send-button {
				all: unset;
				cursor: pointer;
			}
		}


		.comments-block {
			font-family: Roboto;
			font-style: normal;

			.header {
				.title {
					font-weight: 500;
					font-size: 16px;
					color: #1A1E22;
				}

				.switches {
					button {
						font-weight: normal;
						font-size: 13px;
						color: #1A1E22;

						.hr {
							border: none;
							display: block;
							background: transparent;
							border-radius: 6px;
						}

						&.active {
							color: #4B97B4;

							.hr {
								background: #4B97B4;
							}
						}
					}
				}
			}

			.feed {

				.item {
					.username {
						font-weight: bold;
						font-size: 13px;
						color: #1A1E22;
					}

					.timestamp {
						font-weight: normal;
						font-size: 11px;
						color: #1A1E22;
					}

					.description {
						font-weight: normal;
						font-size: 13px;
						color: #1A1E22;
					}

					.option {
						font-weight: normal;
						font-size: 11px;
						color: #4B97B4;
					}

					.reply-btn {
						font-size: 13px;
						color: #6F747F;
						text-transform: uppercase;
					}
				}

			}
		}
	}
</style>
