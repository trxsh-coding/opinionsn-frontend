<template>
    <div class="poll-create-wrapper">

        <el-form  label-position="top" :model="pollForm" ref="pollForm" :rules="rules">


            <!--<el-form-item label="Тема опроса" prop="subject_header" >-->
            <!--<el-select class="select-type max-width br-12" v-model="pollForm" >-->
            <!--<el-option label="Прогноз" value="1"></el-option>-->
            <!--<el-option label="Опрос" value="0"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->


            <el-form-item :label="Категории" prop="subject_header" :rules="[ { required: true, message: lstr('select_topic_name'), trigger: 'change' }]">

                <catalog-dropdown class="max-width" :model="pollForm" field="subject_header"> </catalog-dropdown>

            </el-form-item>

            <div class="subject-header">

                <el-form-item :label="lstr('enter_subject_name')" prop="subject" class="subject-form-item" :rules="[{ required: true, message: lstr('enter_subject_name') , trigger: 'blur' }, { min: 2 , max: 1000, message: lstr('length_should_be_3_to_255'), trigger: 'blur' }]" >

                    <el-input type="textarea" autosize size="small" class="second-option width-90" v-model="pollForm.subject" ></el-input>

                    <span class="label label-daw-padding"><lang-string :title="'photo'"/></span>

                    <div class="icon-daw flex" @click="addMainPhoto">
                        <icon-base
                                v-bind:class="{ primary : mainPicture}"
                                class="icon-daw"
                                fill="none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                icon-dropdown="icon-daw"><icon-daw />
                        </icon-base>
                    </div>

                </el-form-item >

            </div>

            <div class="image-block" v-if="mainPicture">

                <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-change="imagePreview"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                </el-upload>
            </div>

            <el-form-item label="Хэштеги"  >

                <el-input type="textarea" autosize v-model="pollForm.tags"></el-input>

            </el-form-item>

            <el-form-item label="Описание" prop="description" :rules="[{ required: true, message: lstr('enter_description_text') , trigger: 'blur' }, { min: 2 , max: 255, message: lstr('length_should_be_0_to_600'), trigger: 'blur' }]" >

                <el-input type="textarea" autosize class="description-input" v-model="pollForm.description"></el-input>

            </el-form-item>

            <div class="date-picker flex-space-center">

                <el-form-item label="Укажите дату" prop="end_date" >
                    <el-col :span="24">
                        <el-date-picker
                                suffix-icon="el-icon-date"
                                format="yyyy/MM/dd"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="Pick a date"
                                v-model="pollForm.end_date"
                                style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                    <icon-base
                            class="icon-required"
                            fill="none"
                            width="5"
                            height="6"
                            viewBox="0 0 5 6"
                            icon-dropdown="icon-daw"><icon-required />
                    </icon-base>

                </el-form-item>
                <el-form-item label="Укажите время" prop="end_time" >
                    <el-col :span="24">
                        <el-time-select
                                :picker-options="{
                                            start: '00:00',
                                            step: '00:15',
                                            end: '24:00'
                                          }"
                                placeholder="Pick a time"
                                v-model="pollForm.end_time"
                                style="width: 100%;">
                        </el-time-select>
                    </el-col>
                    <icon-base
                            class="icon-required"
                            fill="none"
                            width="5"
                            height="6"
                            viewBox="0 0 5 6"
                            icon-dropdown="icon-daw"><icon-required />
                    </icon-base>
                </el-form-item>
            </div>

            <div class="options-header mb-10 flex-space-center">

                <div class="text-block label-subject">
                    Предложите вариант ответа
                </div>


                <div class="flex-end" @click="addOptionPicture">
                    <span class="label label-daw-padding"><lang-string :title="'photo'"/></span>

                    <icon-base
                            v-bind:class="{ primary : optionPicture}"
                            class="icon-daw"
                            fill="none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            icon-dropdown="icon-daw"><icon-daw />
                    </icon-base>
                </div>
            </div>
            <div class="options-wrapper mb-15">
                <div class="option-block flex-column" v-for="(option, option_id) in pollForm.options" :key="option_id">
                    <div class="option-row">
                        <div class="option-input max-width relative">
                            <el-form-item class="max-width" label="Вариант ответа" :prop="'options.' + option_id + '.description'" :rules="[{ required: true, message: lstr('enter_answer_text') , trigger: 'blur' }, { min: 2 , max: 50, message: 'Длина должна быть от 2 до 50 символов', trigger: 'blur' }]">
                                <el-input type="textarea" autosize v-model="option.description"></el-input>
                            </el-form-item>
                        </div>
                        <div class="delete-option" v-if="pollForm.options.length > 2 && option_id > 1 " @click="deleteOption(option_id)">
                            <span class="label pl-9">Удалить</span>
                        </div>
                    </div>

                    <div class="option-picture" v-if="optionPicture" >

                        <el-upload
                                class="option-picture-uploader"
                                :show-file-list="false"
                                :on-change="(file)=>{optionImagePreview(option_id, file)}">
                            <img v-if="option.optionImageUrl" :src="option.optionImageUrl" class="picture">
                        </el-upload>
                    </div>
                </div>
                <el-button class="max-width br-12" @click="addOption">
                    <lang-string :title="'more'"/>
                </el-button>
            </div>
            <el-button class="save-button" @click="submitForm('pollForm')">

                <lang-string :title="'publish'"/>

            </el-button>
        </el-form>

    </div>
</template>

<script>
    import IconBase from './icons/IconBase'
    import IconDaw from './icons/IconDaw'
    import IconImage from './icons/IconImage'
    import IconRequired from './icons/IconRequired'
    import langString from './langString.vue'
    import {localString} from './../utils/localString'
    import moment from 'moment'
    import CatalogDropdown from './CatalogFeed/catalogDropdown';
    import axios from 'axios'
    import {mapState} from 'vuex'
    export default {
        name: "CreatePoll",
        data(){
            return{
                mainPicture:false,
                optionPicture:false,
                exception:false,
                imageUrl: '',
                picture:'',
                pictures:[],
                pollForm: {
                    picture:'',
                    subject_header:'',
                    subject:'',
                    tags:'',
                    description:'',
                    end_date:'',
                    end_time:'',
                    type_of_poll:'1',
                    options:[
                        {
                            optionImageUrl:'',
                            id:'',
                            picture:'',
                            description:''
                        },
                        {
                            optionImageUrl:'',
                            id:'',
                            picture:'',
                            description:''
                        },
                    ]
                },

            }
        },

        computed: {

            ...mapState('lang',{
                lang : state => state.locale
            }),


            lstr(){
                return (str)=>localString(this.lang, str);
            }


        },

        methods: {

            imagePreview(res, file){

                this.imageUrl = URL.createObjectURL(file[0].raw);
                this.picture = file[0].raw
            },


            optionImagePreview(option_id, file){

                if(file === undefined) {

                } else {

                    this.pollForm.options[option_id].optionImageUrl = URL.createObjectURL(file.raw);

                    this.pollForm.options[option_id].picture = file.raw;





                }
            },

            addMainPhoto(){

                if(this.imageUrl == ''){

                    this.mainPicture = !this.mainPicture;

                    console.log(imageUrl)

                } else  {

                    this.imageUrl = '';

                    this.mainPicture = false;

                }

            },

            addOptionPicture(){

                if(this.optionImageUrl == ''){

                    this.optionPicture = !this.optionPicture;
                    console.log('start')

                } else  {

                    this.optionImageUrl = '';

                    this.optionPicture = false;

                    console.log('over')

                }

            },

            addOption(){

                this.pollForm.options.push({id:'', picture:'', description:'', optionImageUrl:''})

            },

            deleteOption(option_id){

                let options = this.pollForm.options;

                options.splice(option_id, 1);
            },


            submitForm(formName) {
                console.log(this.optionPicture)

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let {pollForm, pictures, optionPicture, exception} = this;
                        let options = this.pollForm.options;
                        for (let option of options) {
                            if(optionPicture && option.picture ==="") {

                                this.$message.error('загрузите фото');
                                exception = true;
                                pictures.length = 0;
                            } else {

                                pictures.push(option.picture);
                                console.log('я это все таки сделал')
                                delete option.picture

                            }

                        }
                        if(!exception) {
                            console.log('hi')
                            let {end_date, end_time} = pollForm;
                            let mDate = moment(`${end_date} ${end_time}`, 'YYYY-MM-DD HH:mm');
                            pollForm.end_date = mDate.toISOString(true);
                            delete pollForm.end_time;
                            var bodyFormData = new FormData();
                            const form = new Blob([JSON.stringify(pollForm)], { type: "application/json"})
                            bodyFormData.append('form', form)
                            bodyFormData.append('file', this.picture)
                            for (let pic of pictures){
                                bodyFormData.append('files[]', pic);
                            }
                            const config = {
                                headers: {
                                    'content-type': 'multipart/mixed'
                                }
                            }
                            axios.post('/api/rest/quiz/create', bodyFormData, config)
                                .then(function(response){
                                    if (response.status === 200) {
                                        this.$router.push({ name: 'pollFeed'})
                                    }
                                }.bind(this))


                        } else alert('bor')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },

        },

        components: {
            CatalogDropdown,
            IconBase,
            IconDaw,
            IconImage,
            IconRequired,
            langString
        }

    }
</script>

<style lang="scss" >
</style>
