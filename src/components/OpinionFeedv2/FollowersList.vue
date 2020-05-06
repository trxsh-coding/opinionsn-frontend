<template>
    <div class="followers-filter">
        <ReSwiper :type="mobile ? 'scroll' : 'usual'"   :swiper-class="mobile ? 'pl-16' : ''"
                  :params="{stubLength: 2, width: '100%'}" :usual-swiper-options="{slidesPerView: 7, spaceBetween: 3.5}" v-if="followings.length">
            <template #usual>
                <swiper-slide class="avatar-wrapper"
                              v-for="{path_to_avatar, username, id, voteIdsToView} in followings">
                    <div class="slide flex-column flex-align-center pointer" @click="filterFeed(id)">
                        <RePicture :url="path_to_avatar | addAssetsPath" size="56"  with-border rounded :active="filter_id === id"/>
                        <div class="amount_block" v-if="voteIdsToView.length"><span>{{counterMap[id].length}}</span></div>
                        <span class="caption font-13 text-center mt-5" :class="{'active_span' : filter_id === id}"> {{trunc(username)}}</span>
                    </div>
                </swiper-slide>
            </template>
            <template #scroll>
                <div v-for="{path_to_avatar, username, id, voteIdsToView} in followings"
                     class="slide mr-12 w-fit flex-column flex-align-center pointer relative" @click="filterFeed(id)">
                    <div class="amount_block" v-if="voteIdsToView.length"><span>{{counterMap[id].length}}</span></div>
                        <RePicture class="mb-5" :url="path_to_avatar | addAssetsPath" with-border size="56" rounded :active="filter_id === id"/>
                    <span class="caption font-11 text-center" :class="{'active_span' : filter_id === id}">{{trunc(username)}}</span>
                </div>
            </template>
        </ReSwiper>
        <div v-else class="empty-title flex-align-center flex-center">
            <span class="font 13">{{translateKeyword('you_have_no_subscriptions_yet')}}</span>
        </div>
    </div>
</template>
<script>
    import RePicture from "../reusableСomponents/RePicture";
    import ReSwiper from "../reusableСomponents/ReSwiper";
    import {mapState} from "vuex";
    import translateKeywordMixin from "../mixins/translateKeywordMixin";
    export default {
        name: "FollowersList",
        components: {ReSwiper, RePicture},
        mixins:[translateKeywordMixin],
        computed: {

            ...mapState("Followings", {
                followings: s => s.list,
                counterMap: s => s.counterMap
            }),
            ...mapState("globalStore", {
                users: s => s.users
            }),
            ...mapState('OpinionStore', {
                filter_id: ({filter_id}) => filter_id,

            }),
            activeFilter(id){
              return this.filter_id === id
            },
            mobile(){
                return this.$root.mobile
            },


        },
        methods: {
            filterFeed(id) {
                this.$store.commit('OpinionStore/setFilterId', this.filter_id === id ? null:id);
                this.$store.dispatch('OpinionStore/list');
            },
            trunc(string, threshold = 8) {
                if (string.length <= threshold) {
                    return string
                } else {
                    return string.slice(0, threshold - 3) + '...';
                }
            }
        },
        async mounted() {
            try {
                await this.$store.dispatch('Followings/initData');
                this.$store.commit('Followings/setCounterState')
            }catch (e) {
                console.trace(e)
            }
        }
    }
</script>

<style lang="scss">
    .followers-filter {
        padding: 16px 0;
        z-index: 9999999;
        border-radius: 8px;
        border: 1px solid #E2E2E2;
        background-color: #FFFFFF;
        .border-outside {
            height: 65px;
            width: 65px;
        }
        .empty-title {
            height: 50px;
            span {
                color: #8E8E93;
            }
        }
        .amount_block {
            width: 17px;
            height: 17px;
            background-color: #4b97b4;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 3px;
            & span {
                font-size: 10px;
                color: #FFFFFF;
            }
        }
        .active_span {
            color: #4b97b4;
        }
        @media only screen and (min-width: 300px) and (max-width: 765px) {
           border: none;
            border-radius: 0;

        }

    }
</style>
