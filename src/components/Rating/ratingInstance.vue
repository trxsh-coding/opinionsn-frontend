<template>
    <div class="rating-instance" :class="{'bg-white': !mobile, 'pt-51': mobile}">
        <category-select
                @on-select="setCategoryId"
                class="pl-60 pr-4"
                :class="{'mt-14': !mobile, 'mt-15': mobile}"
                :current="categoryId"
        />

        <rating-block v-for="(user_rating, index) in rating.muserRatings" :rating="user_rating" :index="index"/>

    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState} from 'vuex';
    import CategorySelect from "../reusableСomponents/categorySelect";
    import RatingBlock from "./ratingBlock";
    export default {
        name: "raitingInstance",
        components: {RatingBlock, CategorySelect},
        data() {
            return {
                categoryId : 1,
                mobile:this.$root.mobile,
                rating:'',
                missingUsers:[]

            }
        },
        watch: {
            categoryId(current, newOne) {
                if (current !== newOne) this.getUserRating()
            }
        },
        computed: {
            ...mapState('globalStore', {

                users: ({users}) => users

            }),
        },
        methods: {
            setCategoryId({id}) {
                this.categoryId = id;
            },

            verifyStores(payload){
                payload.forEach(({userId}) => {
                    this.missingUsers = Array.from(new Set([...this.missingUsers, userId]));
                });
                let usersToVerify = {action: `userPage/getMissingUsers`,payload: this.missingUsers};
                this.$store.dispatch(`globalStore/verifyStore`, {entries: usersToVerify, storeName: `users`}, {root: true});
                console.log('checked');
            },

            getUserRating() {
                axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/${this.categoryId}`, {

                })
                    .then(({data}) => {
                        this.rating = data;
                        this.verifyStores(data.muserRatings);

                    })
            }
        },
        mounted() {
            this.getUserRating()
        }
    }
</script>

<style lang="scss">

</style>