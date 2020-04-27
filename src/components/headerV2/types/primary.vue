<template>
    <div class="header-section">
        <div class="header-block flex-align-center flex-between">
            <span class="route-span">{{routeName}}</span>
            <div class="header-icons flex-center">
                <div class="icon flex-align-center flex-center mr-6">
                    <icon-base width="13.85" height="13.85" view-box="0 0 13.85 13.85">
                        <Create />
                    </icon-base>
                </div>
                <div class="icon flex-align-center flex-center mr-6">
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

    export default {
        name: "primary",
        components: {RePicture, Search, IconBase, Create},
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
                    default :
                        return this.translateKeyword(name)
                }
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
