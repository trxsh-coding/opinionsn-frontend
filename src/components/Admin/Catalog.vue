<template>
    <section class="add-catalog flex-column flex-align-center mx-auto mb-auto mt-100 px-20 py-30">
    
        <span class="headline">Добавить каталог</span>
    
        
        <div class="inputs mt-20">
            
            <input-reusable class="mx-auto"
                            :value="catalog_form.form"
                            @change="updateField(arguments[0], 'form')"
                            inputPlaceholder="Название каталога"
                            width="100%"
                            input
                            with-underline/>
    
            <div class="catalog-bg mt-20" :style="{backgroundImage: `url('${catalog_form.url}')`}">
        
                <upload-reusable
                        icon-photo
                        fit
                        height="100%"
                        @upload="({file, url}) => {
                            updateField(file, 'image');
                            updateField(url, 'url');
                        }" ></upload-reusable>
        
            </div>
    
            <button-reusable
                    @click.native="submitForm"
                    font-size="13"
                    class="v-center mt-20 py-7 px-13"
                    bor-rad="6"
                    bg-color="#4b97b4"
                    color="#ffffff"
                    active-color="#4B97B4"
                    description="save"/>
    
            <button-reusable
                    @click.native="clearForm"
                    font-size="13"
                    class="v-center mt-10 py-7 px-13"
                    bor-rad="6"
                    bg-color="#BCBEC3"
                    color="#ffffff"
                    active-color="#4B97B4"
                    description="clear"/>
            
        </div>
    
    </section>
</template>

<script>
    import axios from 'axios';
    import InputReusable from "@/components/reusableСomponents/InputReusable";
    import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";
    import UploadReusable from "@/components/reusableСomponents/UploadReusable";
    export default {
        name: "Catalog",
        components: {UploadReusable, ButtonReusable, InputReusable},
        data() {
            return {
                catalog_form: {
                    form: 'ruleForm',
                    image:'',
                    url: ''
                }
            };

        },
        methods: {
    
            updateField(val, key) {
                this.catalog_form[key] = val;
            },
            
            submitForm() {

                let formData = new FormData();
    
                let formBlob = new Blob(
                    [JSON.stringify({name: this.catalog_form.form})],
                    { type: "application/json"}
                );
    
                formData.append('file', this.catalog_form.image);
                formData.append('form', formBlob);
    
                const config = {
                    headers: {
                        'content-type': 'multipart/mixed'
                    }
                };
                
                axios.post(`${process.env.VUE_APP_MAIN_API}/rest/admin/categories/create`, formData, config)
                    .then(({status}) => {
                        if (status === 200) {
                            this.$popup.insert('messages', [{message: 'Успешно сохранено!', type: 'success'}]);
                            this.catalog_form = {
                                form: 'ruleForm',
                                image:'',
                                url: ''
                            };
                        } else {
                            this.$popup.insert('messages', [{message: 'Ошибка!', type: 'error'}]);
                        }
                    })

            },
            
            clearForm() {
                this.catalog_form = {
                    form: 'ruleForm',
                    image:'',
                    url: ''
                };
            }
    
        }
    }
</script>

<style lang="scss">
    .add-catalog {
    
        position: relative;
        width: 30%;
        background: #fff;
        border-radius: 6px;
    
        .headline {
            font-family: Roboto;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            color: #1A1E22;
        }
        
        .inputs {
            position: relative;
            width: 200px;
            
            .catalog-bg {
                height: 200px;
                border: 1px solid #BCBEC3;
                border-radius: 6px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
            }
            
        }
    
    }
</style>
