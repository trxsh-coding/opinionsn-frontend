<template lang="html">
    <div class="links-section">
        <ul>
            <li
                    class="link relative"
                    @click="$router.push({ name: 'createPoll' })">
                <icon-base
                        fill="none"
                        width="23"
                        height="23"
                        viewBox="3 0 23 23"
                        icon-name="add"><icon-add-poll/>
                </icon-base>
                <lang-string :title="'add_poll'">

                </lang-string>
            </li>

            <li class="link relative">
                <icon-base
                        fill="none"
                        width="25"
                        height="25"
                        viewBox="3 0 25 25"
                        icon-name="pocket"><icon-pocket/>
                </icon-base>
                <lang-string :title="'pocket'">

                </lang-string>
            </li>
            <li
                    class="link relative"
                    @click="$router.push({ name: 'bookmarkFeed' })">
                <icon-base
                        fill="none"
                        width="15"
                        height="22"
                        viewBox="3 0 11 22"
                        icon-name="add"><icon-bookmark/>
                </icon-base>
                <lang-string :title="'bookmarks'">

                </lang-string>
            </li>
            <li class="link relative">
                <icon-base
                        fill="none"
                        width="14"
                        height="22"
                        viewBox="0 0 14 22"
                        icon-name="add"><icon-judgement/>
                </icon-base>
                <lang-string :title="'judgement'">

                </lang-string>
            </li>
            <li
                    class="link relative"
                    @click="$router.push({ name: 'catalogList' })">
                <icon-base
                        fill="none"
                        width="21"
                        height="22"
                        viewBox="3 0 21 22"
                        icon-name="catalog"><icon-catalog/>
                </icon-base>
                <lang-string :title="'topics'">

                </lang-string>
            </li>
            <li
                    class="link relative"
                    @click="$router.push({ name: 'settings' })">
                <icon-base
                        fill="none"
                        width="21"
                        height="21"
                        viewBox="3 0 21 21"
                        icon-name="add"><icon-settings/>
                </icon-base>
                <lang-string :title="'settings'">

                </lang-string>
            </li>
            <li
                    class="link relative"
                    @click="$router.push({ name: 'feedback' })">
                <icon-base
                        fill="none"
                        width="21"
                        height="21"
                        viewBox="4 0 21 21"
                        icon-name="feedback"><icon-feedback/>
                </icon-base>
                <lang-string :title="'feedback'">

                </lang-string>
            </li>

            <li
                    class="link relative"
                    @click="userLogout">
                <icon-base
                        fill="none"
                        width="21"
                        height="22"
                        viewBox="0 0 21 22"
                        icon-name="exit"><icon-exit/>
                </icon-base>
                <lang-string :title="'exit'">

                </lang-string>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import langMixin from '../mixins/langMixin'
    import {mapState} from 'vuex'
    import IconBase from '../icons/IconBase'
    import IconPocket from '../icons/IconPocket'
    import IconAddPoll from '../icons/IconAddPoll'
    import IconBookmark from '../icons/menu/IconBookmark'
    import IconCatalog from '../icons/menu/IconCatalog'
    import IconExit from '../icons/menu/IconExit'
    import IconFeedback from '../icons/menu/IconFeedback'
    import IconJudgement from '../icons/menu/IconJudgement'
    import IconSettings from '../icons/menu/IconSettings'
    import langString from '../langString'
    export default {
        data(){
            return {

            }
        },
        components: {
            IconBase,
            IconBookmark,
            IconCatalog,
            IconExit,
            IconFeedback,
            IconJudgement,
            IconSettings,
            IconAddPoll,
            langString,
            IconPocket
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
            }

        },


        mounted() {


        }
    }
</script>

<style lang="scss">
    .links-section {

        ul {

            li {
                height: 45px;
                display: flex;
                padding: 11px 0 11px 7px;
                align-items: center;
                border-bottom-color: #BCBEC3;
                border-bottom-width: 0.5px;
                border-bottom-style: solid;
                span {
                    position: absolute;
                    left: 45px;
                    top: 16.5px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 16px;
                    color: #1A1E22;

                }
            }

        }

    }
</style>
