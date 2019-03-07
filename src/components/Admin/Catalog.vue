<template>
    <div class="catalog-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" :label-position="labelPosition">
            <el-form-item label="Название каталога" prop="form">
                <el-input v-model="ruleForm.form"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Создать</el-button>
                <el-button @click="resetForm('ruleForm')">Очистить</el-button>
            </el-form-item>

        </el-form>
        <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :on-change="handleCatalogImage"
                :auto-upload="false">
            <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button @click="check">Проверка</el-button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Catalog",
        data() {
            return {
                labelPosition: 'top',
                ruleForm: {
                    form: '',
                    image:'',
                },
                rules: {
                    name: [
                        { required: true, message: 'Впишите название темы', trigger: 'blur' },
                        { min: 3, max: 20, message: 'Впишите от 3 до 20 символов', trigger: 'blur' }
                    ],
                }
            };

        },
        methods: {
            check(){
              console.log(this.ruleForm.image)
                console.log(this.ruleForm.name)

            },
            handleCatalogImage(res, file) {

                this.ruleForm.image = file[0].raw;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var bodyFormData = new FormData();

                        let formBlob = new Blob([JSON.stringify({name: this.ruleForm.form})], { type: "application/json"});

                        bodyFormData.append('file', this.ruleForm.image);
                        bodyFormData.append('form',formBlob);
                        console.log(bodyFormData);

                        const config = {
                            headers: {
                                'content-type': 'multipart/mixed'
                            }
                        }
                        axios.post('/api/rest/admin/categories/create', bodyFormData, config)
                            .then(function(response){
                                if (response.status === 200) {

                                }
                            }.bind(this))


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss">
    .catalog-wrapper {
        margin-top: 10px;
        padding: 15px;
        background: #fff;
        border-radius: 6px;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>
