<template>
    <div class="poll-create-wrapper">
        <div class="header-annotation flex">
            <h1 class="primary-header-annotation mr-36"><lang-string :title="'poll'"/> </h1>
            <h3 class="secondary-header-annotation"><lang-string :title="'prediction'"/> </h3>
        </div>
            <div class="switch__item">
                <switch-component
                        :height="21"
                        :width="34"
                        :bor-rad="18"
                        color="#B7B9BE"
                        active-color="#81B6CB"
                        :boolean="blockchainPrediction"
                        @change="onSelect"
                        active-description="OFF-CHAIN"
                        inactive-description="BLOCKCHAIN"
                        text-layout="right"
                />
            </div>
        <div class="type-of-poll-block mt-16">
            <lang-string :title="'choose_type_of_poll'" class="choice-span"/>
            <button-reusable class="h-30 mb-6 mt-6" :bor-rad="30" :color="timeLimit ? '#4B97B4': '#B7B9BE'" description="time_limit" @click.native="chooseTypeOfPoll(true)" />
            <button-reusable class="h-30 " :bor-rad="30" :color="timeLimit ?  '#B7B9BE' : '#4B97B4'" description="no_time_limit"   @click.native="chooseTypeOfPoll(false)"/>
        </div>
        <div class="category-block mt-12">
            <catalog-dropdown v-model="category"></catalog-dropdown>
        </div>
        <input-reusable :value="form.subject_header"
                        @change="updateField(arguments[0], 'subject_header')"
                        class="mt-12"
                        :input-placeholder="'heading'"/>
        <input-reusable :value="form.description"
                        @change="updateField(arguments[0], 'description')"
                        class="mt-12"
                        :input-placeholder="'description'"/>
        <!--<upload-reusable-->
                <!--class="mt-12"-->
                <!--:value="form.picture"-->
                <!--@change="updateField(arguments[0], 'picture')">-->
            <!--<template #icon>-->
                <!--<icon-base-->
                        <!--fill="none"-->
                        <!--width="20"-->
                        <!--height="17"-->
                        <!--viewBox="0 0 20 17"-->
                        <!--icon-name="add"><icon-upload-photo/>-->
                <!--</icon-base>-->
            <!--</template>-->
        <!--</upload-reusable>-->
        <input-reusable :value="form.tags"
                        @change="updateField(arguments[0], 'tags')"
                        class="mt-12"
                        :input-placeholder="'tags'"/>
        <div class="border-b mt-18"></div>
        <div class="options-block" v-for="(option, index) in form.options "  :key="index">
            {{option.picture}}
            <input-reusable
                    :value="option.description"
                    @change="updateArrayField(arguments[0], 'options', 'description', index)"
                    class="mt-12"
                    :input-placeholder="'add_option'"/>
            <upload-reusable
                    class="mt-12"
                    :value="option.picture"
                    @change="(file)=> {check(index, file)}">
                <template #icon>
                    {{index}}
                    <icon-base
                            fill="none"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            icon-name="add"><icon-upload-photo/>
                    </icon-base>
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
    export default {
        name: "CreatePoll",
        data(){
            return {
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

            }),
        },
        methods: {

            updateField(value, keyName){

                this.$store.commit('creationManagement/UPDATE_FIELD', {value, keyName})

            },
            check(check, file){
                console.log(check);
                console.log(file);

            },
            updateArrayField(value, arrayName, keyName, index){


                this.$store.commit('creationManagement/UPDATE_ARRAY_FIELD', {value, arrayName, keyName, index })

            },
            chooseTypeOfPoll(payload){

                this.timeLimit = payload
            }

        },

        components: {
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
