<template>
    <div class="user-settings">

        <label class="label label-1">
            <span class="caption">
               <lang-string  :title="'name'" />
            </span>
            <input
                    :value="form.name"
                    @change="updateField(arguments[0], 'name')"
                    type="text">
        </label>

        <label class="label label-2 mt-12">
            <span class="caption">
               <lang-string  :title="'username'" />
            </span>
            <input
                    :value="form.username"
                    @change="updateField(arguments[0], 'username')"
                    type="text">
        </label>

        <label class="label label-3 mt-12">
            <span class="caption">
               <lang-string  :title="'status'" />
            </span>
            <input
                    :value="form.status"
                    @change="updateField(arguments[0], 'status')"
                    type="text">
        </label>

        <label class="label label-4 mt-12">
            <span class="caption">
               <lang-string :title="'location'" />
            </span>
            <input
                    :value="form.location"
                    @change="updateField(arguments[0], 'location')"
                    type="text">
        </label>

        <label class="label label-5 mt-12">
            <span class="caption">
               <lang-string :title="'site'" />
            </span>
            <input
                    :value="form.site"
                    @change="updateField(arguments[0], 'site')"
                    type="text">
        </label>

        <label class="label label-6 mt-12">
            <span class="caption">
               <lang-string :title="'gender'" />
            </span>
            <input
                    :value="form.gender"
                    @change="updateField(arguments[0], 'gender')"
                    type="text">
        </label>

        <label class="label label-7 mt-12">
            <span class="caption">
               <lang-string :title="'email'" />
            </span>
            <input
                    :value="form.email"
                    @change="updateField(arguments[0], 'email')"
                    type="text">
        </label>

        <label class="label label-8 mt-12">
            <span class="caption">
               <lang-string :title="'phone'" />
            </span>
            <input
                    :value="form.phone"
                    @change="updateField(arguments[0], 'phone')"
                    type="text">
        </label>

    </div>
</template>

<script>
    import langString from "../langString";
    import {mapState} from "vuex";

    export default {
        name: "userSettings",
        components: {
            langString
        },
        computed: {
            
            ...mapState('creationManagement', {

                form: s => s.edit_form,

            }),
            
            
        },
        methods: {
            updateArrayField(value, arrayName, keyName, index){


                this.$store.commit('creationManagement/UPDATE_ARRAY_FIELD', {value, arrayName, keyName, index, form: 'edit_form' })

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