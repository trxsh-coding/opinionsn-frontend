<template>
    <div class="feedback-form">
        <div class="feedback-header">
            <span>Вы находитесь на тестовой версии первой crowd wisdom платформы на основе технологии Blockchain.
                <br>
                <br> Opinion — это социальная сеть, где пользователи участвуют в опросах, делятся мнениями, предсказывают исход событий и получают вознаграждения за точные прогнозы.
                <br>
                <br>Мы будем Вам благодарны за оставленный отзыв по работе системы или предложение по ее улучшению.

                Отзыв можно оставить, заполнив форму или отправив нам сообщение в социальных сетях.</span>
        </div>
        <div class="form-section mt-15">
            <el-form v-model="feedbackForm" ref="feedbackForm">
                <el-form-item>
                    <el-input placeholder="E-mail" v-model="feedbackForm.email">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea"  v-model="feedbackForm.description">

                    </el-input>
                </el-form-item>
                <el-upload
                        class="upload-demo"
                        :before-remove="beforeRemove"
                        :auto-upload="false"
                        multiple
                        :limit="3"
                        :on-change="handlePreview"
                        ref="upload">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
            </el-form>
            <div class="button-section flex-space-center">
                <el-button class="primary-btn" @click="submitForm(feedbackForm)">
                    Отправить
                </el-button>


            </div>


        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "feedbackForm",
        data(){
            return {
                pictures:[],
                feedbackForm:{
                    email:'',
                    description:'',

                }

            }
        },
        methods: {
            handlePreview(file){
                this.pictures.push(file)
            },
            submitForm(formName){
                var bodyFormData = new FormData();
                const form = new Blob([JSON.stringify(formName)], { type: "application/json"})
                bodyFormData.append('form', form)
                bodyFormData.append('files', this.pictures)
                const config = {
                    headers: {
                        'content-type': 'multipart/mixed'
                    }
                }
                axios.post('/api/feedback', bodyFormData, config)
                    .then(function(response){
                        if (response.status === 200) {
                            this.loading = false;
                            this.$router.push({ name: 'pollFeed'})
                        }
                    }.bind(this))

            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            },



        }
    }
</script>

<style lang="scss">
    .feedback-form {
        padding: 20px;
        border-radius: 12px;
        background: #FFFFFF;
        text-align: center;

        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 13px;
            color: #152D3A;
            padding-right: 6px;

        }
        .form-section {

            .el-input__inner, .el-textarea__inner {

                border-radius: 24px !important;

            }

            .el-textarea__inner {

                min-height: 150px;

            }

        }
    }
</style>
