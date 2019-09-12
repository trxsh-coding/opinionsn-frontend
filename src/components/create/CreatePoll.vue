<template>
	<div class="poll-create-wrapper" :class="{'bg-white': !mobile, 'blockchain': is_blockchain}">
		<create-header @submit="onFormSubmit"/>
		
		<div class="create-form ">
			<div class="button-block mb-18 pl-60">
				
				<button-reusable
						text-transform="capitalize"
						class="mr-20 "
						:active-font-size="20"
						:font-size="15"
						bg-color="#ffffff"
						button_type="underline"
						color="#BCBEC3"
						active-color="#4B97B4"
						description="poll"
						:active="type === 'POLL'"
						@click.native="setTypeOfCreation('POLL')"
				/>
				
				<button-reusable
						v-if="mainUser.authorities === 'ADMIN'"
						:active-font-size="20"
						:font-size="15"
						bg-color="#ffffff"
						button_type="underline"
						color="#BCBEC3"
						active-color="#4B97B4"
						description="prediction"
						:active="type === 'PREDICTION'"
						@click.native="setTypeOfCreation('PREDICTION')"
				
				/>
			</div>
			
			<category-select :is-current-string="true" :current="form.subject_header" @on-select="setCategory"
			                 class="pl-60" :slides-per-view="3.6"/>
			
			<div class="description-block mt-20 pl-60">
				<popup-error-reusable
						span-class="mt-3 flex-align-center"
						:errors="form.errors.tags">
					<re-input textarea :preset="2" input-class="mt-24"
					          placeholder="tags" :params="{width: '100%'}"
					          :value="form.tags" @input="updateField(arguments[0], 'tags')" />
				</popup-error-reusable>
				
				<popup-error-reusable
						span-class="mt-3 flex-align-center"
						:errors="form.errors.subject">
					<re-input textarea :preset="2" class="mt-12" input-class="mt-24"
					          placeholder="heading" :params="{width: '100%'}"
					          :value="form.subject" @input="updateField(arguments[0], 'subject')" />
				</popup-error-reusable>
				
				<popup-error-reusable
						span-class="mt-3 flex-align-center"
						:errors="form.errors.description">
					<re-input textarea :preset="2" class="mt-12" input-class="mt-24"
					          placeholder="description" :params="{width: '100%'}"
					          :value="form.description" @input="updateField(arguments[0], 'description')" />
				</popup-error-reusable>
			</div>
			
			<lang-string class="label flex mt-12 pl-60" :title="'add_pictures_to_poll'"/>
			
			<div class="picture-block flex-align-center mt-15">
				
				<div class="icon__item p-25 pointer" @click="addSubjectPicture">
					<icon-base
							width="11"
							height="12"
							viewBox="0 0 11 12"
							icon-name="drop-add">
						<icon-add/>
					</icon-base>
				</div>
				<swiper :options="swiperOption" class="mb-12">
					<swiper-slide v-for="(item, index) in pictures" :key="index">
						<ReUpload
								description
								image-preview
								with-close-btn
								pre-width="100%"
								:pre-height="mobile ? 190 : 371"
								:value="item.picture"
								@upload="({file}) => {updateArrayPictures(file, index)}"
								@remove="() => { updateArrayPictures(null, index) }">
						</ReUpload>
					</swiper-slide>
					<div v-show="pictures.length > 1" class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			
			<lang-string class="label pl-60" :title="'add_options'"/>
			
			<popup-error-reusable
					class="mb-10"
					width="calc(100% - 60px)"
					span-class="ml-auto mt-3 flex-align-center"
					v-for="(option, index) in form.options" :key="index"
					:errors="form.errors.options[index]">
				
				<div class="options-section flex-align-center" :class="{'pl-60' : index < 2}">
					<div class="delete-block pl-25 pr-24 pointer" v-if="index > 1">
						<icon-base
								@click.native="deleteOption(index)"
								width="11"
								height="12"
								viewBox="0 0 11 12"
								icon-name="icon-minus">
							<icon-minus/>
						</icon-base>
					</div>
					<div class="options-block">
						
						<re-input textarea class="input-label px-14" input-class="my-auto"
						          :params="{width: '100%'}"
						          placeholder="answer_text" :value="option.description"
						          @input="updateArrayField(arguments[0], null, 'options', 'description', index)" />
						
						<ReUpload
								:label-class="{'br-6 br-error': (form.errors.options[index] && form.errors.options[index].checkUpload)}"
								:pre-height="(form.errors.options[index] && form.errors.options[index].checkUpload) ? 59 : 61"
								:pre-width="(form.errors.options[index] && form.errors.options[index].checkUpload) ? 59 : 61"
								image-preview
								with-close-btn
								image-layout="bottom"
								width="fit-content"
								:value="option.picture"
								@upload="({file, url}) => {updateArrayField(file, url, 'options', 'picture', index)}"
								@remove="() => {
                                    updateArrayField(null, '', 'options', 'picture', index);
                                    onOptionPictureRemove(index)}">
						</ReUpload>
					</div>
				</div>
			
			</popup-error-reusable>
			
			<add-option-block class="ml-60" @click.native="pushMoreOption"/>
			
			<div class="additional-fields mt-20 pl-60" v-if="additionalField">
				
				<re-switcher
						class="blockchain-switcher flex-reverse"
						caption-class="caption ml-10"
						:value="is_blockchain"
						@input="setTypeOfPoll"
						:caption="is_blockchain ? lstr('BLOCKCHAIN') : lstr('OFF_CHAIN')"
						:params="{width: 16, height: 8, color: '#000000', padding: '4px 8px', border: '2px solid #000000'}"/>
				
				<re-checkbox class="time-limit-checkbox flex-reverse mt-12" caption-class="caption ml-10"
				             :value="with_time_limit" @input="setTimeLimit"
				             :size="20" v-if="form.type_of_poll == 1 || form.type_of_poll == 2"
				             :caption="with_time_limit ? lstr('time_limit') : lstr('no_time_limit')" />
				
				<re-input v-if="is_blockchain" :preset="2" class="mt-12" input-class="mt-24" :params="{width: '100%'}"
				          placeholder="fund" :value="form.fund" @input="updateField(arguments[0], 'fund')" />
				
				<popup-error-reusable
						class="mt-12"
						v-if="form.type_of_poll == 3"
						span-class="mt-3 flex-align-center"
						:errors="form.errors.max_participants_cap">
					<re-input v-if="is_blockchain" :preset="2" input-class="mt-24" :params="{width: '100%'}"
					          placeholder="max_participants_cap" :value="form.max_participants_cap"
					          @input="updateField(arguments[0], 'max_participants_cap')" />
				</popup-error-reusable>
				
				<input-reusable
						v-if="form.type_of_poll == 1 || form.type_of_poll == 2"
						class="mt-18"
						:height="44"
						:value="form.end_date"
						withoutBlur="true"
						date-picker
						@date-pick="updateField(arguments[0], 'end_date')"
						input-placeholder="closing_date"
				/>
			
			</div>
		</div>
	</div>
</template>

<script>
	
	import ReSwitcher from "../reusableСomponents/ReSwitcher";
	import langString from "../langString"
	import ButtonReusable from "../reusableСomponents/ButtonReusable";
	import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
	import ReusableSelect from "../reusableСomponents/reusableSelect";
	import CatalogDropdown from "../create/CatalogDropdown";
	import InputReusable from "../reusableСomponents/InputReusable";
	import ReUpload from "../reusableСomponents/ReUpload";
	import IconBase from "../icons/IconBase";
	import IconAdd from "../icons/create/IconAdd";
	import IconMinus from "../icons/create/IconMinus";
	import IconUploadPhoto from "../icons/create/IconUploadPhoto";
	import {mapState} from "vuex"
	import langMixin from "../mixins/langMixin";
	import CategorySelect from "../reusableСomponents/categorySelect";
	import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';
	import Header from "../view/mobile/header";
	import CreateHeader from "./createHeader";
	import ValidationMixin from "../mixins/ValidationMixin";
	import AddOptionBlock from "./addOptionBlock";
	import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";
	import {createForecast} from "../../EOSIO/eosio_impl_light";
	import ReCheckbox from "@/components/reusableСomponents/ReCheckbox";
	import ReInput from "@/components/reusableСomponents/ReInput";
	
	export default {
		name: "CreatePoll",
		mixins: [
			langMixin,
			ValidationMixin
		],
		data() {
			return {
				route_leaved: false,
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					}
				},
				blockchainPrediction: false,
				category: null,
				subject: null,
				subject_description: null,
				mobile: this.$root.mobile,
				additionalField: true,
				type: 'POLL'
			}
		},
		
		watch: {
			
			values_with_rules(val) {
				if (!this.route_leaved) {
					let {
						verifyValues,
						checkLength,
						checkAmount
					} = this;
					
					verifyValues('create_poll_form', val, {checkLength, checkAmount});
				}
			},
			
			options_with_rules(val) {
				if (!this.route_leaved) {
					let {
						verifyValues,
						checkLength,
						checkUpload,
						checkAmount
					} = this;
					
					verifyValues('create_poll_form', val, {checkLength, checkUpload, checkAmount});
				}
			},
			
		},
		
		computed: {
			
			...mapState('formManagment', {
				
				form: s => s.create_poll_form,
				end_date: s => s.create_poll_form.end_date,
				pictures: s => s.pictures,
				enablePicture: s => s.withPicture,
				errors: s => s.create_poll_form.errors,
				with_time_limit: s => s.create_poll_form.with_time_limit,
				state: s => s
				
			}),
			
			
			...mapState("globalStore", {
				mainUser: ({mainUser}) => mainUser
			}),
			
			values_with_rules() {
				let {form} = this;
				
				let max_participants_cap = form.type_of_poll == 3 ? [{
					value: parseInt(form.max_participants_cap),
					key: 'max_participants_cap',
					rules: [{method_name: 'checkAmount', args: [{lower_bound: 0}]}]
				}] : [];
				
				return [
					{
						value: form.tags,
						key: 'tags',
						rules: [{method_name: 'checkLength', args: [0, 100]}]
					},
					{
						value: form.subject,
						key: 'subject',
						rules: [{method_name: 'checkLength', args: [5, 255]}]
					},
					{
						value: form.description,
						key: 'description',
						rules: [{method_name: 'checkLength', args: [0, 650]}]
					},
					...max_participants_cap
				]
			},
			
			options_with_rules() {
				return this.form.options.map(({description: str, picture}, index) => {
					return {
						value: {str, index},
						array_key: 'options',
						key: index,
						rules: [
							{method_name: 'checkLength', args: [2, 65]},
							{method_name: 'checkUpload', args: [this.getPicsIndexList()]},
						]
					}
				})
			},
			
			is_blockchain() {
				return this.form && (this.form.type_of_poll == 2 || this.form.type_of_poll == 3);
			},
			
			message: {
				get() {
					return this.end_date
				}
				,
				set(value) {
					this.$store.commit('formManagment/SET_DATE_TIME', value)
				}
			}
		},
		methods: {
			addSubjectPicture() {
				this.$store.commit('formManagment/ADD_SUBJECT_PICTURE');
			},
			getPicsIndexList() {
				
				let index_arr = [];
				
				Object.values(this.form.options).forEach(({picture}, index) => {
					if (picture !== null) index_arr.push(index);
				});
				
				return index_arr;
				
			},
			
			checkError(key) {
				let {form} = this;
				return !!form.errors[key] && Object.values(form.errors[key]).some(error => !!error)
			},
			
			onFormSubmit() {
				let {verifyValues, options_with_rules, checkLength, checkUpload, checkAmount, values_with_rules, errors = {}, form: pollForm} = this;
				verifyValues('create_poll_form', values_with_rules, {checkLength, checkAmount});
				verifyValues('create_poll_form', options_with_rules, {checkLength, checkUpload, checkAmount});
				
				let errors_summary = Object.values(errors).flatMap(err => Object.values(err));
				errors_summary = errors_summary.flatMap(err => {
					
					switch (true) {
						case err === null:
							return err;
						case typeof err === 'object':
							return Object.values(err);
						default:
							return err;
					}
					
				});
				
				let has_errors = errors_summary.some(err => err !== null);
				
				this.$forceUpdate();
				
				if (!has_errors) {
					
					this.$store.dispatch('formManagment/SUBMIT_POLL_FORM', this.mainUser.id)
						.then(poll_id => {
							if (pollForm.type_of_poll === 2) {
								createForecast(
										poll_id, this.mainUser.id,
										pollForm.subject,
										pollForm.options.map(({description}) => description))
									.then(() => console.log("EOSIO forecast created"));
							}
							
							this.$router.push({name: 'singlePoll', params: {id: poll_id}});
							
						})
						.catch(() => this.$popup.insert('messages', [{
							message: 'Ошибка при отправке!',
							type: 'error'
						}]))
					
				} else {
					this.$popup.insert('messages', [{
						message: 'Невозможно опубликовать, ошибка в заполнении!',
						type: 'error'
					}]);
				}
				
			},
			
			onOptionPictureRemove(index) {
				
				this.enabledPictureIndex.pop(index);
				
			},
			
			setTypeOfPoll(bool) {
				let type_of_poll;
				
				switch (this.type) {
					case "POLL":
						type_of_poll = bool ? 3 : 0;
						this.updateField(type_of_poll, 'type_of_poll');
						break;
					case "PREDICTION":
						type_of_poll = bool ? 2 : 1;
						this.updateField(type_of_poll, 'type_of_poll');
						break;
				}
			},
			
			setTypeOfCreation(payload) {
				
				this.type = payload;
				
				let currentTypeOfCreation = this.type === 'POLL' ? 0 : 1;
				
				this.updateField(currentTypeOfCreation, 'type_of_poll')
			},
			unhideAdds(payload) {
				this.additionalField = payload;
				
			},
			isFutureDate(date) {
				const currentDate = new Date();
				return date <= currentDate;
			},
			
			
			pushMoreOption() {
				
				this.$store.commit('formManagment/ADD_OPTION')
				
			},
			insertPicture(payload) {
				
				this.$store.commit('formManagment/INSERT_PICTURES', payload)
				
				
			},
			changeMutableState(payload) {
				this.$store.commit('creationManagement/CHANGE_MUTABLE_STATE', payload)
				
			},
			setTimeLimit(payload) {
				this.$store.commit('formManagment/SET_TIME_LIMIT', payload)
			},
			
			deleteOption(index) {
				this.$store.commit('formManagment/DELETE_OPTION', index)
			},
			
			setCategory({name}) {
				this.$store.commit('formManagment/SET_CATEGORY_NAME', name)
			},
			
			updateField(value, key) {
				
				this.$store.commit('formManagment/UPDATE_FIELD', {value, key, form: 'create_poll_form'})
				
			},
			
			updateArrayField(value, url, arrayName, keyName, index) {
				
				this.$store.commit('formManagment/UPDATE_ARRAY_FIELD', {
					value,
					arrayName,
					keyName,
					index,
					form: 'create_poll_form'
				})
				
			},
			
			updateArrayPictures(file, index) {
				
				this.$store.commit('formManagment/UPDATE_ARRAY_PICTURES', {file, index})
				
			},
			
			chooseTypeOfPoll(payload) {
				
				this.timeLimit = payload
			},
			
			
		},
		
		beforeRouteLeave(to, from, next) {
			this.route_leaved = true;
			this.$store.commit('formManagment/CLEAR_FORM', 'create_poll_form');
			this.$store.commit('formManagment/CLEAR_FORM', 'pictures');
			next();
		},
		
		components: {
			ReInput,
			ReCheckbox,
			PopupErrorReusable,
			AddOptionBlock,
			CreateHeader,
			Header,
			CategorySelect,
			IconBase,
			ReUpload,
			InputReusable,
			CatalogDropdown,
			ReusableSelect,
			DropdownListReusable,
			ButtonReusable,
			langString,
			IconUploadPhoto,
			DatePick,
			IconAdd,
			IconMinus,
			ReSwitcher
		}
		
	}
</script>

<style lang="scss">
	.poll-create-wrapper {
		border-radius: 6px;
		padding-right: 20px;
		
		&.blockchain {
			// background: rgba(210, 194, 255, 1);
			// background: linear-gradient(to right, rgba(210, 194, 255, 1) 0%, rgba(205, 136, 162, 1) 100%);
			// filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d2c2ff', endColorstr='#cd88a2', GradientType=1);
			
		}
		
		.header-annotation {
			align-items: center;
			
		}
		
		.button-block {
			display: flex;
			align-items: flex-end;
		}
		
		h1 {
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 26px;
			color: #4B97B4;
		}
		
		.vdpComonent {
			outline: none;
			border: none;
			border-bottom: 0.5px solid #747474;
			padding-bottom: 10px;
		}
		
		h3 {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			color: #747474;
			
		}
		
		.picture-block {
			.swiper-container {
				width: 100%;
			}
		}
		
		.options-block {
			width: 100%;
			border-radius: 6px;
			justify-content: flex-end;
			border: 0.5px solid #BCBEC3;
			display: flex;
			flex-direction: row-reverse;
			align-items: stretch;
			
			
			.input-label {
				flex: 1;
				
				textarea {
					max-height: 62px;
				}
			}
			
			/*&:first-of-type {*/
			/*	margin-top: 6px !important;*/
			/*}*/
			
			.input-block {
				display: flex;
				align-items: center;
				white-space: nowrap;
			}
			
			input {
				border: none !important;
			}
			
			.image-preview {
				margin: 0 !important;
			}
		}
		
		.input-reusable .input-placeholder {
			font-size: 12px;
		}
		
		.switch__item {
			padding-bottom: 12px;
			border-bottom: 1px solid #4B97B4;
		}
		
		.additional-fields {
			* {
				transition: 300ms;
			}
			
			.time-limit-checkbox .caption {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 13px;
				color: #152D3A;
			}
			
			.blockchain-switcher {
				.caption {
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 13px;
					color: #152D3A;
				}
			}
		}
		
		.input {
			padding-top: 24px;
		}
		
		.type-of-poll-block {
			.choice-span {
				font-family: Roboto;
				font-size: 12px;
				color: #747474;
			}
		}
	}


</style>
