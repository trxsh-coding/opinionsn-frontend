<template>
    <div class="user-settings">

        <popup-error-reusable :errors="form.errors.first_name" >
            <label class="label label-1">
            <span class="caption">
               <lang-string  :title="'first_name'" />
            </span>
                <input
                        :value="form.first_name"
                        @input="({target}) => { updateField(target.value, 'first_name') }"
                        type="text">
            </label>
        </popup-error-reusable>
        
        <popup-error-reusable :errors="form.errors.username" >
            <label class="label label-2 mt-12">
            <span class="caption">
               <lang-string  :title="'username'" />
            </span>
                <input
                        :value="form.username"
                        @input="({target}) => { updateField(target.value, 'username') }"
                        type="text">
            </label>
        </popup-error-reusable>

        <popup-error-reusable :errors="form.errors.status" >
            <label class="label label-3 mt-12">
            <span class="caption">
               <lang-string  :title="'status'" />
            </span>
                <input
                        :value="form.status"
                        @input="({target}) => { updateField(target.value, 'status') }"
                        type="text">
            </label>
        </popup-error-reusable>
        
        <popup-error-reusable :errors="form.errors.location" >
            <label class="label label-4 mt-12">
            <span class="caption">
               <lang-string :title="'location'" />
            </span>
                <input
                        :value="form.location"
                        @input="({target}) => { updateField(target.value, 'location') }"
                        type="text">
            </label>
        </popup-error-reusable>
        
        <popup-error-reusable :errors="form.errors.site" >
            <label class="label label-5 mt-12">
            <span class="caption">
               <lang-string :title="'site'" />
            </span>
                <input
                        :value="form.site"
                        @input="({target}) => { updateField(target.value, 'site') }"
                        type="text">
            </label>
        </popup-error-reusable>
        
        <popup-error-reusable :errors="form.errors.gender" >
            <label class="label label-6 mt-12">
            <span class="caption">
               <lang-string :title="'gender'" />
            </span>
                <input
                        :value="form.gender"
                        @input="({target}) => { updateField(target.value, 'gender') }"
                        type="text">
            </label>
        </popup-error-reusable>

        <popup-error-reusable :errors="form.errors.email" >
            <label class="label label-7 mt-12">
            <span class="caption">
               <lang-string :title="'email'" />
            </span>
                <input
                        :value="form.email"
                        @input="({target}) => { updateField(target.value, 'email') }"
                        type="text">
            </label>
        </popup-error-reusable>
        
        <popup-error-reusable :errors="form.errors.phone_number" >
            <label class="label label-8 mt-12">
            <span class="caption">
               <lang-string :title="'phone'" />
            </span>
                <input
                        :value="form.phone_number"
                        @input="({target}) => { updateField(target.value, 'phone_number') }"
                        type="text">
            </label>
        </popup-error-reusable>

    </div>
</template>

<script>
    import langString from "../langString";
    import ValidationMixin from "../mixins/ValidationMixin";
    import {mapState} from "vuex";
    import PopupErrorReusable from "../reusableСomponents/PopupErrorReusable";

    export default {
        name: "userSettings",
        mixins: [ValidationMixin],
        components: {
            PopupErrorReusable,
            langString
        },

        watch: {
            values_with_rules() {
                let {
                    verifyValues,
                    checkLength
                } = this;

                verifyValues('edit_form', this.values_with_rules, { checkLength });
            }
        },

        computed: {
            ...mapState('formManagment', {
                form: s => s.edit_form
            }),

            values_with_rules() {
                let { form } = this;

                return [
                    {
                        value: form.first_name,
                        key: 'first_name',
                        rules: [{ method_name: 'checkLength', args: [0, 20] }]
                    },

                    {
                        value: form.username,
                        key: 'username',
                        rules: [{ method_name: 'checkLength', args: [3, 20] }]
                    },

                    {
                        value: form.status,
                        key: 'status',
                        rules: [ {method_name: 'checkLength', args: [0, 60] }]
                    },

                    {
                        value: form.location,
                        key: 'location',
                        rules: [ {method_name: 'checkLength', args: [0, 20] }]
                    },

                    {
                        value: form.site,
                        key: 'site',
                        rules: [ {method_name: 'checkLength', args: [0, 30] }]
                    },

                    {
                        value: form.email,
                        key: 'email',
                        rules: [ {method_name: 'checkLength', args: [0, 40] }]
                    },

                    {
                        value: form.phone_number,
                        key: 'phone_number',
                        rules: [ {method_name: 'checkLength', args: [0, 20] }]
                    },
                ]
            },
        },

        methods: {
            updateField(value, key){
                this.$store.commit('formManagment/UPDATE_FIELD', {form: 'edit_form', key, value})
            },
        },
    }
</script>

<style lang="scss">
    .user-settings {
        position: relative;
        width: 100%;

        .label {
            display: flex;
            padding-bottom: 12px;
            border-bottom: 0.5px solid #BCBEC3;

            .caption {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 12px;

                span {
                    font-weight: normal;
                    font-size: 14px;
                    color: #4B97B4;
                    display: inline-block;
                    width: 78px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

            }

            input {
                border: none;
                outline: none;

                /*border: 1px solid #BCBEC3;*/

                font-weight: normal;
                font-size: 14px;
                color: #1A1E22;

            }
        }

    }
</style>
