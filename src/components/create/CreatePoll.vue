<template>
    <div class="poll-create-wrapper">
        <div class="header-annotation flex">
            <h1 class="primary-header-annotation mr-36"><lang-string :title="'poll'"/> </h1>
            <h3 class="secondary-header-annotation"><lang-string :title="'prediction'"/> </h3>
        </div>
        <category-select />

        <input-reusable :value="form.tags"
                        @change="updateField(arguments[0], 'tags')"
                        class="mt-12 mb-12"
                        :input-placeholder="'tags'"/>

        <input-reusable :value="form.subject_header"
                        @change="updateField(arguments[0], 'subject_header')"
                        class="mt-12"
                        :input-placeholder="'heading'"/>
        <input-reusable :value="form.description"
                        @change="updateField(arguments[0], 'description')"
                        class="mt-12"
                        :input-placeholder="'description'"/>
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in pictures" :key="index">
                <upload-reusable
                        image-preview
                        class="mt-12"
                        pre-width="100%"
                        :pre-height="190"
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
                    class=" pl-14 mt-1"
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
                subject_description:null
            }
        },


        computed: {

            ...mapState('creationManagement', {

                form: s => s.form,
                pictures: s => s.pictures,
                enablePicture: s => s.withPicture,

            }),
        },
        methods: {
            onBlurFunction(index){
                this.$store.commit('creationManagement/ADD_OPTION', index)

            },
            insertPicture(payload){

                this.$store.commit('creationManagement/INSERT_PICTURES', payload)


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
            }

        },

        components: {
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
            IconUploadPhoto

        }

    }
</script>

<style lang="scss" >
    .poll-create-wrapper {
        padding: 0 20px;
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
