<template>
	<div class="poll-create-wrapper " :class="{'bg-white': !mobile}">

		<create-header @submit="onFormSubmit"/>

		<div class="create-form pl-60">
			<div class="button-block mb-18">
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
			<category-select/>

			<popup-error-reusable
					:errors="form.errors.tags">
				<input-reusable :value="form.tags"
				                textarea
				                @change="updateField(arguments[0], 'tags')"
				                class="mt-20 mb-12 flex-between"
				                width="100%"
				                :input-placeholder="'tags'"/>
			</popup-error-reusable>

			<popup-error-reusable
					:errors="form.errors.subject">
				<input-reusable :value="form.subject"
				                @change="updateField(arguments[0], 'subject')"
				                class=" flex-between"
				                :class="{'TEST': checkError('subject_header')}"
				                textarea
				                :input-placeholder="'heading'"/>
			</popup-error-reusable>



			<popup-error-reusable
                    :errors="form.errors.description">
				<input-reusable :value="form.description"
				                @change="updateField(arguments[0], 'description')"
				                class="mt-12 mb-12 flex-between"
				                textarea
				                :input-placeholder="'description'"/>
			</popup-error-reusable>

			<lang-string class="label" :title="'add_pictures_to_poll'"/>
			<swiper :options="swiperOption" class="mb-12">
				<swiper-slide v-for="(item, index) in pictures" :key="index">
					<upload-reusable
							description
							image-preview
							pre-width="100%"
							:pre-height="mobile ? 190 : 371"
							:value="item.picture"
							@upload="({file}) => {updateArrayPictures(file, index)}">

					</upload-reusable>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>


			<!--<div class="border-b mt-18"></div>-->
			<!--<switch-component-->
					<!--class="mb-18"-->
					<!--type="button"-->
					<!--:height="11"-->
					<!--:width="20"-->
					<!--:bor-rad="18"-->
					<!--color="#FFFFFF"-->
					<!--active-color="#81B6CB"-->
					<!--:value="enablePicture"-->
					<!--@select="insertPicture"-->
					<!--:active-description="lstr('with_pictures')"-->
					<!--:inactive-description="lstr('without_pictures')"-->
					<!--text-layout="right"-->
			<!--/>-->
			<lang-string class="label" :title="'add_options'"/>

			<popup-error-reusable
                    v-for="(option, index) in form.options" :key="index"
					:errors="form.errors.options[index]">

				<div class="options-block">

					<input-reusable
							textarea
							:value="option.description"
							:height="60"
							@change="updateArrayField(arguments[0], null, 'options', 'description', index)"
							class="flex-align-center pl-14 mt-1"
							input-placeholder="answer_text"
					/>

					<upload-reusable
							:pre-height="60"
							:pre-width="60"
							image-preview
							image-layout="bottom"
							width="fit-content"
							:value="option.picture"
							@upload="({file, url}) => {updateArrayField(file, url, 'options', 'picture', index)}"
                            @remove="() => {
                            updateArrayField(null, '', 'options', 'picture', index);
                             onOptionPictureRemove(index)}">
						<template #icon>

						</template>
					</upload-reusable>

				</div>

			</popup-error-reusable>
			<add-option-block  @click.native="pushMoreOption"/>

			<switch-component
					v-if="type === 'PREDICTION'"
					class="mb-20"
					text-layout="right"
					type="arrow"
					:active-description="lstr('additional_settings')"
					:inactive-description="lstr('additional_settings')"
					:boolean="additionalField"
					@select="unhideAdds"/>
			<div class="additional-fields" v-if="additionalField && type === 'PREDICTION'">

				<switch-component
						class="mb-16"
						type="button"
						:height="11"
						:width="20"
						:bor-rad="18"
						color="#FFFFFF"
						active-color="#81B6CB"
						:value="form.type_of_poll"
						@select="updateField(arguments[0], 'type_off_poll')"
						:active-description="lstr('BLOCKCHAIN')"
						:inactive-description="lstr('OFF_CHAIN')"
						text-layout="right"
				/>
				<switch-component
						class="mb-18"
						:boolean="withDate"
						type="checkbox"
						:value="withDate"
						:active-description="lstr('no_time_limit')"
						:inactive-description="lstr('time_limit')"
						@select="timeLimit"/>


				<input-reusable
						:value="form.fund"
						input
						class="mb-20"
						@change="updateField(arguments[0], 'fund')"
						input-placeholder="fund"
				/>
				<input-reusable
						:height="44"
						:value="form.end_date"
						date-picker
						@date-pick="updateField(arguments[0], 'end_date')"
						input-placeholder="closing_date"
				/>
			</div>
		</div>
	</div>
</template>

<script>

    import SwitchComponent from "../reusableСomponents/switchComponent";
    import langString from "../langString"
    import ButtonReusable from "../reusableСomponents/ButtonReusable";
    import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
    import ReusableSelect from "../reusableСomponents/reusableSelect";
    import CatalogDropdown from "../create/CatalogDropdown";
    import InputReusable from "../reusableСomponents/InputReusable";
    import UploadReusable from "../reusableСomponents/UploadReusable";
    import IconBase from "../icons/IconBase";
    import IconUploadPhoto from "../icons/create/IconUploadPhoto";
    import {mapState} from "vuex"
    import langMixin from "../mixins/langMixin";
    import CategorySelect from "../reusableСomponents/categorySelect";
    import CheckboxReusable from "../reusableСomponents/checkboxReusable";
	import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';
    import Header from "../view/mobile/header";
    import CreateHeader from "./createHeader";
    import TextareaReusable from "../reusableСomponents/textareaReusable";
    import ValidationMixin from "../mixins/ValidationMixin";
	import AddOptionBlock from "./addOptionBlock";
    import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";

    export default {
        name: "CreatePoll",
        mixins: [
			langMixin,
			ValidationMixin
		],
        data(){
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                blockchainPrediction: false,
                category:null,
                subject:null,
                subject_description:null,
                mobile: this.$root.mobile,
				additionalField: true,
				type:'POLL'
            }
        },

		watch: {

			values_with_rules() {
				let {
					verifyValues,
					checkLength
				} = this;

				verifyValues('create_poll_form', this.values_with_rules, { checkLength });
			},

			options_with_rules() {
				let {
					verifyValues,
					checkLength,
					checkUpload
				} = this;

				verifyValues('create_poll_form', this.options_with_rules, { checkLength, checkUpload });
			},

		},

		computed: {

			...mapState('formManagment', {

				form: s => s.create_poll_form,
				end_date: s => s.create_poll_form.end_date,
				pictures: s => s.pictures,
				enablePicture: s => s.withPicture,
				errors: s => s.create_poll_form.errors,
				withDate: s => s.isTimeLimit,
				state: s => s

			}),


            ...mapState("globalStore", {
                mainUser: ({ mainUser }) => mainUser
            }),

			values_with_rules() {
				let { form } = this;

				return [
					{
						value: form.tags,
						key: 'tags',
						rules: [{ method_name: 'checkLength', args: [0, 100] }]
					},

					{
						value: form.subject,
						key: 'subject',
						rules: [{ method_name: 'checkLength', args: [5, 100] }]
					},
					{
						value: form.description,
						key: 'description',
						rules: [ {method_name: 'checkLength', args: [0, 650] }]
					},
				]
			},

			options_with_rules() {
				return this.form.options.map(({description: str, picture}, index) => {
					return {
						value: {str, index},
                        array_key: 'options',
						key: index,
						rules: [
						    {method_name: 'checkLength', args: [2, 65] },
                            {method_name: 'checkUpload', args: [this.getPicsIndexList()] },
                        ]
					}
				})
			},

			message: {
				get() {
					return this.end_date
				},
				set(value) {
					this.$store.commit('formManagment/SET_DATE_TIME', value)
				}
			}
		},
		methods: {
			
			getPicsIndexList(){
				
				let index_arr = [];
				
				Object.values(this.form.options).forEach(({picture}, index) => {
					if (picture !== null) index_arr.push(index);
				});
				
				return index_arr;
				
			},
			
			checkError(key) {
        		let { form } = this;
        	    return !!form.errors[key] && Object.values(form.errors[key]).some(error => !!error)
	        },

            onFormSubmit(){
	
	            // console.log('test');
	
	            let {verifyValues, options_with_rules, checkLength, checkUpload, values_with_rules, errors = {}} = this;
				verifyValues('create_poll_form', values_with_rules, { checkLength });
				verifyValues('create_poll_form', options_with_rules, { checkLength, checkUpload });

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
					this.$store.dispatch('formManagment/SUBMIT_FORM', this.mainUser.id);
				} else {
					alert('Невозможно опубликовать, ошибка в заполнении!')
				}

            },

            onOptionPictureRemove(index){

				this.enabledPictureIndex.pop(index);

            },


			setTypeOfCreation(payload){

				this.type = payload;

				let currentTypeOfCreation = this.type === 'POLL' ? 0 : 1;

				this.updateField(currentTypeOfCreation, 'type_of_poll')
			},
			unhideAdds(payload){
				this.additionalField = payload ;

			},
			isFutureDate(date) {
				const currentDate = new Date();
				return date <= currentDate;
			},


			pushMoreOption(){

				this.$store.commit('formManagment/ADD_OPTION')

			},
			insertPicture(payload) {

				this.$store.commit('formManagment/INSERT_PICTURES', payload)


			},
			changeMutableState(payload){
				this.$store.commit('creationManagement/CHANGE_MUTABLE_STATE', payload)

			},
			timeLimit(payload) {

				this.$store.commit('creationManagement/SET_TIME_LIMIT', payload)


			},

			check(date) {
				console.log(date)
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

        components: {
	        PopupErrorReusable,
			AddOptionBlock,
            TextareaReusable,
            CreateHeader,
            Header,
            CheckboxReusable,
            CategorySelect,
            IconBase,
            UploadReusable,
            InputReusable,
            CatalogDropdown,
            ReusableSelect,
            DropdownListReusable,
            ButtonReusable,
            SwitchComponent,
            langString,
            IconUploadPhoto,
			DatePick

		}

	}
</script>

<style lang="scss" >
    .poll-create-wrapper {
        border-radius: 6px;
		padding-right: 20px;
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



		.options-block {
			margin-bottom: 10px;
			border-radius: 6px;
			justify-content: flex-end;
			border: 0.5px solid #BCBEC3;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;



			textarea {
				border: none !important;
				margin-top: 0;
			}
			&:first-of-type {
				margin-top: 6px !important;
			}

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
