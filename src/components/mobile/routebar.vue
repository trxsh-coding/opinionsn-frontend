<template lang="html">
    <aside class="routebar">
        <ul>
            <router-link class-active="active" class="hidden-sm-and-up mobile relative" tag="li" to="/add" v-if="mainUser.authorities === 'ADMIN'">
                <icon-base
                        :class="{secondary : $route.path==='/add'} "
                        class="add-poll"
                        fill="#152D3A"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        icon-name="add-poll"><icon-add-poll/>
                </icon-base>
                <a><lang-string :title="'add_poll'"/></a>
            </router-link>
            <router-link class-active="active" class="hidden-sm-and-up relative" tag="li" to="/bookmarkFeed">
                <icon-base
                        :class="{secondary : $route.path==='/bookmarkFeed'} "
                        class="bookmark"
                        fill="#152D3A"
                        width="18"
                        height="24"
                        viewBox="0 0 12 15"
                        icon-name="bookmark"><icon-bookmark/>
                </icon-base>
                <a><lang-string :title="'bookmarked'"/></a>
            </router-link>
            <el-popover
                    placement="bottom"
                    :title="lstr('balance')"
                    width="200"
                    trigger="click"
                    :content="mainUser.balance  ">
                <li class="hidden-sm-and-up relative" slot="reference">
                    <icon-base
                            fill="none"
                            width="24"
                            height="22"
                            viewBox="0 0 24 20"
                            icon-name="pocket"><icon-pocket/>
                    </icon-base>
                    <a><lang-string :title="'pocket'"/></a>
                </li>
            </el-popover>

            <router-link class-active="active" class="hidden-sm-and-up relative" tag="li" to="/catalogList">
                <icon-base
                        fill="none"
                        width="22"
                        height="25"
                        viewBox="0 0 22 25"
                        icon-name="catalog"><icon-catalog/>
                </icon-base>
                <a><lang-string :title="'topics'"/></a>
            </router-link>
            <li class="hidden-sm-and-up relative">
                <icon-base
                        fill="none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        icon-name="settings"><icon-settings/>
                </icon-base>
                <a><lang-string :title="'settings'"/></a>
            </li>
            <li class="hidden-sm-and-up relative unbordered" @click="userLogout">
                <icon-base
                        fill="none"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="settings"><icon-exit/>
                </icon-base>
                <a><lang-string :title="'exit'"/></a>
            </li>
        </ul>
    </aside>
</template>

<script>
    import axios from 'axios'
    import IconBase from '../icons/IconBase.vue'
    import IconSettings from '../icons/IconSettings.vue'
    import IconMain from '../icons/IconMain.vue'
    import IconOpinion from '../icons/IconOpinion.vue'
    import IconBookmark from '../icons/IconBookmark.vue'
    import IconExit from '../icons/IconExit.vue'
    import IconAddPoll from '../icons/IconAddPoll.vue'
    import langString from '../langString.vue'
    import IconBell from '../icons/IconBell.vue'
    import IconPocket from '../icons/IconPocket.vue'
    import IconCatalog from '../icons/IconCatalog.vue'
    import langMixin from '../mixins/langMixin'
    import {mapState} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        mixins:[langMixin],
        computed: {

            ...mapState('globalStore', {

                mainUser: ({mainUser}) => mainUser

            }),

        },
        methods:{

            userLogout() {

                axios.get(`${process.env.VUE_APP_MAIN_API}/auth/logout`)
                    .then((response) => {
                            this.$store.commit("authentication/setAuthenticated", false)
                            this.$store.commit("userPage/removeUser");
                            this.$store.commit("pollFeed/clearFeed");
                            this.$store.commit("globalStore/clearStores")
                            this.$router.push('/login/sign');
                    })
					.catch(()=> {
						    this.$store.commit("authentication/setAuthenticated", false)
                            this.$store.commit("userPage/removeUser");
                            this.$store.commit("pollFeed/clearFeed");
                            this.$store.commit("globalStore/clearStores")
                            this.$router.push('/login/sign');
					})
            },

        },
        components: {
            IconBase,
            IconSettings,
            IconMain,
            IconOpinion,
            IconBookmark,
            langString,
            IconExit,
            IconAddPoll,
            IconBell,
            IconPocket,
            IconCatalog

        },

        mounted() {


        }
    }
</script>

<style lang="scss">
    .routebar {

        background-color: #ffffff;
        padding-left: 15px;
        padding-right: 16px;
        border-radius: 12px;
        g {
            fill:#ffffff;
        }
        svg {

        }
        .unbordered {

            border-bottom: none;

        }
        .primary {



            rect {

                stroke: #4B97B4;

            }

            path {

                stroke: #4B97B4;


            }

            .question {

                stroke: none;
                fill: #4B97B4;

            }
        }
        .is-fixed {

            top:4px !important;
            right: 9px !important;
        }

        .el-badge__content {

            border-radius: 30px;
            color: #FFF;
            display: inline-block;
            font-size: 8px;
            height: 11px;
            line-height: 10px;
            padding: 0px 3px;
            text-align: center;
            white-space: nowrap;
            border: 1px solid #FFF;

        }


        .secondary {

            path {

                fill: #4B97B4 !important;

            }

        }
        .bookmark {

            path {

                stroke:#152D3A;

            }

        }
        .router-link-exact-active {
            a {
                color:#4B97B4;
            }
        }
        ul {
            padding-left: 0;
            margin-top: 0px;
            li {
                border-bottom-width: 0.5px;
                border-bottom-color: #DADADA;
                border-bottom-style: solid;
                padding-bottom: 9px;
                padding-top: 6px;
                position: relative;
                list-style: none;
                display: flex;
                align-items: center;
            }
        }




        a {
            color: #383838;
            font-size: 12px;
            line-height: 12px;
            margin-left: 10px;
            text-decoration: none;
            padding-top: 3px;
        }
        figure {
            display: inline-block !important;
            width: 21px;
            height: 21px;
            vertical-align:middle;
        }

        .hidden-sm-and-up {

            padding: 10px 0 11px 0;

            span {

                position: absolute;
                top: 17px;
                left: 35px;

            }

        }

        .mobile {


        }

    }
</style>
