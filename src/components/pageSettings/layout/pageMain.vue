<template>

    <div class="main flex-column flex-align-center">

        <ul class="parameter-btns flex-center pl-30 pr-10">
            <li
                    class="btn btn-1 pb-2 pointer"
                    :class="{ active: parameter === 1 }"
                    @click="setParameter(1)">
                <lang-string :title="'private_settings'"/>
            </li>
            <li
                    class="btn btn-2 pb-2 ml-18 pointer"
                    :class="{ active: parameter === 2 }"
                    @click="setParameter(2)">
                <lang-string :title="'feed_settings'"/>
            </li>
        </ul>

        <user-settings class="mt-21" v-if="parameter === 1" />
        <feed-settings class="mt-21" v-if="parameter === 2" />

    </div>

</template>

<script>
    import langString from "../../langString";
    import UserSettings from "../userSettings";
    import FeedSettings from "../feedSettings";

    export default {
        name: "pageMain",
        components: {
            FeedSettings,
            UserSettings,
            langString
        },
        data() {
            return {
                parameter: 1,
                child_data: {
                    name: '',
                    username: '',
                    status: '',
                    location: '',
                    site: '',
                    gender: '',
                    email: '',
                    phone: ''
                }
            }
        },
        methods: {
            setParameter(parameter) {
                this.parameter = parameter;
            },
        },
    }
</script>

<style lang="scss">
    .settings-page {

        .main {
            position: relative;
            width: 100%;

            .parameter-btns {
                width: 100%;

                .btn {
                    border-bottom: 2px solid transparent;

                    span {
                        font-weight: normal;
                        font-size: 13px;
                        color: #BCBEC3;
                    }

                    &.active {
                        border-bottom: 2px solid #4B97B4;

                        span {
                            font-weight: 500;
                            font-size: 15px;
                            color: #4B97B4;
                        }
                    }

                }
            }

        }
    }

</style>