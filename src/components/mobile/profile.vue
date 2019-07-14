<template lang="html">
    <div id="profile-section">
        <avatar
                pic-class="mr-9"
                :img="publicPath + imageUtil(user.path_to_avatar, 'S')"
                :size="36"
                textLayout="right"
                rounded>
            <template #title>
                <span class="username">
                    {{user.username}}
                </span>
            </template>
            <template #description>
                <lang-string :title="'balance'" class="balance-text" >
                    <template #text >
                      :  {{user.balance}} OPI
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

<style lang="scss" >
    #profile-section {
        margin-bottom: 27.5px;

        .balance-text {
            font-family: Helvetica Neue,serif;
            font-size: 10px;
            line-height: 10px;
            color: #BEC0C5;
        }
        .picture-reusable {
            display: flex;
            justify-content: flex-start;
            border-bottom-width: 0.5px;
            border-bottom-style: solid;
            border-bottom-color: #D0D1D5 ;
            opacity: 0.7;
            width: 100%;
            padding-bottom: 12px;
        }

    }

</style>
