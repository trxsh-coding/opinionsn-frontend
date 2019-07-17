<template>
    <div class="poll-create-wrapper" :class="{'bg-white': !mobile}">
        <create-header />
        <div class="header-annotation flex">
            <h1 class="primary-header-annotation mr-36"><lang-string :title="'poll'"/> </h1>
            <h3 class="secondary-header-annotation"><lang-string :title="'prediction'"/> </h3>
        </div>
        <category-select />

        <input-reusable :value="form.tags"
                        textarea
                        @change="updateField(arguments[0], 'tags')"
                        class="mt-12 mb-12 flex-between"
                        width="100%"
                        :input-placeholder="'tags'"/>

        <input-reusable :value="form.subject_header"
                        @change="updateField(arguments[0], 'subject_header')"
                        class="mt-12 mb-12 flex-between"
                        textarea
                        :input-placeholder="'heading'"/>
        <input-reusable :value="form.description"
                        @change="updateField(arguments[0], 'description')"
                        class="mt-12 mb-12 flex-between"
                        textarea
                        :input-placeholder="'description'"/>
        <swiper :options="swiperOption" class="mb-12">
            <swiper-slide v-for="(item, index) in pictures" :key="index">
                <upload-reusable
                        image-preview
                        class="mt-12"
                        pre-width="100%"
                        :pre-height="mobile ? 190 : 371"
                        :value="item.picture"
                        @upload="({file, url}) => {updateArrayField(file, url, 'pictures', 'picture', index)}">

                </upload-reusable>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>




        <!--<div class="border-b mt-18"></div>-->
        <switch-component
                :height="11"
                :width="20"
                :bor-rad="18"
                color="#FFFFFF"
                active-color="#81B6CB"
                :value="enablePicture"
                @select="insertPicture"
                :active-description="lstr('with_picture')"
                :inactive-description="lstr('without_picture')"
                text-layout="right"
        />
        <lang-string class="option-label" :title="'add_options'"/>

        <div class="options-block" v-for="(option, index) in form.options" :key="index">
            <input-reusable
                    :value="option.description"
                    :height="60"
                    @change="updateArrayField(arguments[0], null, 'options', 'description', index, 'form')"
                    @blur.once="onBlurFunction(index)"
                    class="flex-align-center pl-14 mt-1"
                    input-placeholder="answer_text"
            />
            <upload-reusable
                    :pre-height="60"
                    :pre-width="60"
                    :image-preview="enablePicture"
                    image-layout="bottom"
                    width="fit-content"
                    :value="option.picture"
                    @upload="({file, url}) => {updateArrayField(file, url, 'options', 'picture', index, 'form')}">
                <template #icon>

                </template>
            </upload-reusable>
        </div>
        <checkbox-reusable />
        <date-pick v-model="message"
                   :isDateDisabled="isFutureDate"
                   :format="'YYYY-MM-DD HH:mm'"
                   :pickTime="true"
                   @change="check(arguments)">

        </date-pick>

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
    export default {
        name: "CreatePoll",
        mixins:[langMixin],
        data(){
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                blockchainPrediction: false,
                timeLimit:false,
                category:null,
                subject:null,
                subject_description:null,
                mobile: this.$root.mobile
            }
        },


        computed: {

            ...mapState('creationManagement', {

                form: s => s.form,
                end_date: s => s.form.end_date,
                pictures: s => s.pictures,
                enablePicture: s => s.withPicture,

            }),
            message: {
                get () {
                    return this.end_date
                },
                set (value) {
                    this.$store.commit('creationManagement/SET_DATE_TIME', value)
                }
            }
        },
        methods: {

            isFutureDate(date){
                const currentDate = new Date();
                return date <= currentDate;
            },
            onBlurFunction(index){
                this.$store.commit('creationManagement/ADD_OPTION', index)

            },
            insertPicture(payload){

                this.$store.commit('creationManagement/INSERT_PICTURES', payload)


            },
            check(date){
              console.log(date)
            },
            updateField(value, keyName){

                this.$store.commit('creationManagement/UPDATE_FIELD', {value, keyName, form: 'form' })

            },

            updateArrayField(value, url, arrayName, keyName, index, form){
                console.log(form)
                this.$store.commit('creationManagement/UPDATE_ARRAY_FIELD', {value, arrayName, keyName, index, form })

            },
            chooseTypeOfPoll(payload){

                this.timeLimit = payload
            },


        },

        components: {
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
        padding: 0 20px;
        border-radius: 6px;
        .header-annotation {
            align-items: center;

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
        .option-label {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
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
        .type-of-poll-block {
            .choice-span {
                font-family: Roboto;
                font-size: 12px;
                color: #747474;
            }
        }
    }


</style>
