<template>
    <div class="header-section">
        <div class="header-block flex-align-center flex-between">
            <div class="flex-align-center" v-if="$route.name !== 'QuestionsFeed'">
                <ArrowBack class="mr-20" v-if="$route.name === 'singlePoll'" @click.native="$router.go(-1)"/>
                <span  class="route-span">{{routeName}}</span>
            </div>
            <img  v-else src="../../../../public/img/OG.jpg"  height="30" alt="">
            <div class="header-icons flex-center" v-if="mainUser.id">
                <div class="icon flex-align-center flex-center mr-6" @click="navigationPush('createPoll')">
                    <icon-base width="13.85" height="13.85" view-box="0 0 13.85 13.85">
                        <Create />
                    </icon-base>
                </div>
                <div class="icon flex-align-center flex-center mr-6" @click="navigationPush('search')">
                    <icon-base width="13.85" height="13.85" view-box="0 0 13.85 13.85">
                        <Search/>
                    </icon-base>
                </div>
                <RePicture :url="mainUser.path_to_avatar | addAssetsPath"
                           rounded size="28"
                           class="pointer"
                           @click.native="RedirectToAuthor(mainUser.id)"
                />
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import Create from "../../iconsV2/Create";
    import IconBase from "../../icons/IconBase";
    import Search from "../../iconsV2/Search";
    import RePicture from "../../reusableСomponents/RePicture";
    import {mapState} from "vuex";
    import RedirectMixin from "../../mixins/RedirectMixin";
    import ArrowBack from "../../iconsV2/ArrowBack";

    export default {
        name: "primary",
        components: {ArrowBack, RePicture, Search, IconBase, Create},
        mixins:[translateKeywordMixin, RedirectMixin],

        computed: {
            ...mapState("globalStore", {
                mainUser: state => state.mainUser
            }),
            routeName(){
                const {name}  = this.$route;
                switch (name) {
                    case 'opinionFeed':
                        return this.translateKeyword('opinions');
                    case 'singlePoll':
                        return this.translateKeyword('questions');
                    default :
                        return this.translateKeyword(name)
                }
            }
        },
        methods: {
            navigationPush(name){
                this.$router.push({name:name})
            }
        }
    }
</script>

<style lang="scss">
    .header-section {
        background: #FFFFFF;
        position: fixed;
        top:0;
        width: 100%;
        transition:300ms;
        left: 0;
        z-index: 999;
        .header-block {
            border-bottom: 0.5px solid #D8D8D8;
            padding: 12px 16px 14px 16px;

        }
        & .route-span {
            font-weight: bold;
            font-size: 18px;
        }
        & .icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #F2F2F2;
        }
    }
</style>
