<template>
    <div class="user-settings">

        <label class="label label-1">
            <span class="caption">
               <lang-string  :title="'name'" />
            </span>
            <input
                    :value="form.name"
                    @change="({target}) => { updateField(target.value, 'name') }"
                    type="text">
        </label>

        <label class="label label-2 mt-12">
            <span class="caption">
               <lang-string  :title="'username'" />
            </span>
            <input
                    :value="form.username"
                    @change="({target}) => { updateField(target.value, 'username') }"
                    type="text">
        </label>

        <label class="label label-3 mt-12">
            <span class="caption">
               <lang-string  :title="'status'" />
            </span>
            <input
                    :value="form.status"
                    @change="({target}) => { updateField(target.value, 'status') }"
                    type="text">
        </label>

        <label class="label label-4 mt-12">
            <span class="caption">
               <lang-string :title="'location'" />
            </span>
            <input
                    :value="form.location"
                    @change="({target}) => { updateField(target.value, 'location') }"
                    type="text">
        </label>

        <label class="label label-5 mt-12">
            <span class="caption">
               <lang-string :title="'site'" />
            </span>
            <input
                    :value="form.site"
                    @change="({target}) => { updateField(target.value, 'site') }"
                    type="text">
        </label>

        <label class="label label-6 mt-12">
            <span class="caption">
               <lang-string :title="'gender'" />
            </span>
            <input
                    :value="form.gender"
                    @change="({target}) => { updateField(target.value, 'gender') }"
                    type="text">
        </label>

        <label class="label label-7 mt-12">
            <span class="caption">
               <lang-string :title="'email'" />
            </span>
            <input
                    :value="form.email"
                    @change="({target}) => { updateField(target.value, 'email') }"
                    type="text">
        </label>

        <label class="label label-8 mt-12">
            <span class="caption">
               <lang-string :title="'phone'" />
            </span>
            <input
                    :value="form.phone_number"
                    @change="({target}) => { updateField(target.value, 'phone_number') }"
                    type="text">
        </label>

    </div>
</template>

<script>
    import langString from "../langString";
    import ValidationMixin from "../mixins/ValidationMixin";
    import {mapState} from "vuex";

    export default {
        name: "userSettings",
        mixins: [ValidationMixin],
        components: {
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
                        value: form.name,
                        value_name: 'name',
                        rules: [{ method_name: 'checkLength', args: [2] }]
                    },

                    {
                        value: form.username,
                        value_name: 'username',
                        rules: [{ method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.status,
                        value_name: 'status',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.location,
                        value_name: 'location',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.site,
                        value_name: 'site',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.gender,
                        value_name: 'gender',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.email,
                        value_name: 'email',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },

                    {
                        value: form.phone_number,
                        value_name: 'phone_number',
                        rules: [ {method_name: 'checkLength', args: [0, 4] }]
                    },
                ]
            },
        },

        methods: {
            updateField(value, keyName){
                this.$store.commit('formManagment/UPDATE_FIELD', {form: 'edit_form', keyName, value})
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