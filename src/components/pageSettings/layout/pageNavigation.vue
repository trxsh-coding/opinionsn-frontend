<template>
    <div class="navigation flex-between flex-align-center">
        <lang-string
                @click.native="setInitForm"
                class="cancel-btn pointer"
                :title="'cancel'" />
        <lang-string
                class="title"
                :title="'edit_profile'" />
        <lang-string
                @click.native="sendForm"
                class="submit-btn pointer"
                :title="'done'" />
    </div>
</template>

<script>
    import langString from "../../langString";
    import {mapState} from "vuex";

    export default {
        name: "pageNavigation",
        components: {
            langString
        },

        computed: {
            ...mapState('globalStore', {
                mainUser: s => s.mainUser
            }),
            
            ...mapState('formManagment', {
                form: s => s.edit_form
            })
        },

        methods: {

            setInitForm() {
                this.$store.commit('formManagment/SET_INITIAL_FORM', {form: 'edit_form', value: {...this.mainUser}});
            },

            sendForm() {
    
                let { errors = {} } = this.form;
    
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
                    
                    this.$store.dispatch('formManagment/SUBMIT_USERPAGE_FORM', this.form);
                    alert('success');
                    
                } else {
                    
                    alert('Невозможно отредактировать, ошибка в заполнении!');
                    
                }
                
            }

        },
    }
</script>

<style lang="scss">

    .navigation {

        .cancel-btn {
            font-weight: normal;
            font-size: 13px;
            color: #BCBEC3;
        }

        .title {
            font-weight: bold;
            font-size: 17px;
            color: #4B97B4;
        }

        .submit-btn {
            font-weight: normal;
            font-size: 13px;
            color: #1A1E22;
        }

    }

</style>