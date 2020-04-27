<template>
    <div class="followers-filter">
        <ReSwiper :type="mobile ? 'scroll' : 'usual'"   :swiper-class="mobile ? 'pl-16' : ''"
                  :params="{stubLength: 2, width: '100%'}" :usual-swiper-options="{slidesPerView: 7, spaceBetween: 3.5}">
            <template #usual>
                <swiper-slide class="avatar-wrapper"
                              v-for="{avatar, username, user_id} in followersData">
                    <div class="slide flex-column flex-align-center pointer" @click="filterFeed(user_id)">
                        <RePicture :url="avatar | addAssetsPath" size="56"  with-border rounded :active="filter_id === user_id"/>
                        <span class="caption font-13 text-center mt-5" :class="{'active_span' : filter_id === user_id}"> {{trunc(username)}}</span>
                    </div>
                </swiper-slide>
            </template>
            <template #scroll>
                <div v-for="{avatar, username, user_id} in followersData"
                     class="slide mr-12 w-fit flex-column flex-align-center pointer" @click="filterFeed(user_id)">
                        <RePicture class="mb-5" :url="avatar | addAssetsPath" with-border size="56" rounded :active="filter_id === user_id"/>
                    <span class="caption font-11 text-center" :class="{'active_span' : filter_id === user_id}">{{trunc(username)}}</span>
                </div>
            </template>
        </ReSwiper>
    </div>
</template>
<script>
    import RePicture from "../reusableСomponents/RePicture";
    import ReSwiper from "../reusableСomponents/ReSwiper";
    import {mapState} from "vuex";
    export default {
        name: "FollowersList",
        components: {ReSwiper, RePicture},
        computed: {

            ...mapState("followsPage", {
                followings: s => s.items
            }),
            ...mapState("globalStore", {
                users: s => s.users
            }),
            ...mapState('OpinionStore', {
                filter_id: ({filter_id}) => filter_id,

            }),
            followersData(){
                return this.followings.map(({id}, index) => ({
                    avatar: this.users[id].path_to_avatar,
                    username: this.users[id].username,
                    user_id: id
                }));
            },
            activeFilter(id){
              console.log(id)
              console.log(this.filter_id)
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
        mounted() {
            this.$store.dispatch('followsPage/getMyFollowings')
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
        margin-bottom: 15px;
        .border-outside {
            height: 65px;
            width: 65px;
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
