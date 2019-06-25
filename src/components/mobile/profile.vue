<template lang="html">
    <div id="profile-section">
        <avatar :img="publicPath + imageUtil(user.path_to_avatar, 'S')" :size="36" textLayout="right" bor-rad="50%">
            <template #title>
                <span class="username">
                    {{user.username}}
                </span>
            </template>
            <template #description>
                <lang-string :title="'balance'" >
                    <template #text class="balance-text">
                      :  {{user.balance}}
                    </template>
                </lang-string>

            </template>
        </avatar>
    </div>
</template>
<script>
    import IconBase from '../icons/IconBase.vue'
    import IconLocation from '../icons/IconLocation.vue'
    import avatar from '../reusableСomponents/PictureReusable'
    import langString from '../langString'
    import { mapState } from 'vuex';
    import imageMixin from "../mixins/imageMixin";
    export default {
        mixins:[imageMixin],
        data () {
            return {
                publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        methods: {

            userLink(userId){

                this.$router.push({name:'user',params:{id:userId}})

            },
        },
        computed: {

            ...mapState('globalStore', {

                user: ({mainUser}) => mainUser

            }),

        },
        components: {
            IconBase,
            IconLocation,
            avatar,
            langString
        },
    }
</script>

<style lang="scss" scoped>
    .balance-text {
        font-family: Helvetica Neue,serif;
        font-size: 10px;
        line-height: 10px;
        color: #BEC0C5;
    }
</style>
