<template>
    <div class="user-settings">

        <label class="label label-1">
            <span class="caption">
               <lang-string  :title="'name'" />
            </span>
            <input v-model="name" type="text">
        </label>

        <label class="label label-2 mt-12">
            <span class="caption">
               <lang-string  :title="'username'" />
            </span>
            <input v-model="username" type="text">
        </label>

        <label class="label label-3 mt-12">
            <span class="caption">
               <lang-string  :title="'status'" />
            </span>
            <input v-model="status" type="text">
        </label>

        <label class="label label-4 mt-12">
            <span class="caption">
               <lang-string :title="'location'" />
            </span>
            <input v-model="location" type="text">
        </label>

        <label class="label label-5 mt-12">
            <span class="caption">
               <lang-string :title="'site'" />
            </span>
            <input v-model="site" type="text">
        </label>

        <label class="label label-6 mt-12">
            <span class="caption">
               <lang-string :title="'gender'" />
            </span>
            <input v-model="gender" type="text">
        </label>

        <label class="label label-7 mt-12">
            <span class="caption">
               <lang-string :title="'email'" />
            </span>
            <input v-model="email" type="text">
        </label>

        <label class="label label-8 mt-12">
            <span class="caption">
               <lang-string :title="'phone'" />
            </span>
            <input v-model="phone" type="text">
        </label>

    </div>
</template>

<script>
    import langString from "../langString";

    export default {
        name: "userSettings",
        components: {
            langString
        },
        data() {
            return {
                name: '',
                username: '',
                status: '',
                location: '',
                site: '',
                gender: '',
                email: '',
                phone: ''
            }
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