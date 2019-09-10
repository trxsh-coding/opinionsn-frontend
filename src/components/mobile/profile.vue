<template lang="html">
    <div id="profile-section">
        <avatar
                avatar
                :id="mainUser.id"
                pic-class="mr-9 pointer"
                :img="publicPath + imageUtil(mainUser.path_to_avatar, 'S')"
                :size="36"
                textLayout="right"
                rounded>
            <template #title>
                <span class="username pointer" @click="userLink">
                    {{mainUser.username}}
                </span>
            </template>
            <template #description>
                <lang-string :title="'balance'" class="balance-text" >
                    <template #text >
                      :  {{mainUser.balance}} OPI
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
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,

            }
        },
        methods: {

            userLink() {
                this.$router.push({ name:'user', params: {id: this.mainUser.id} })
            },
            
        },
        computed: {

            ...mapState('globalStore', {
    
                mainUser: ({mainUser}) => mainUser

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
