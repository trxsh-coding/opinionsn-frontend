<template>
    <div class="rating-instance" :class="{'bg-white pt-18': !mobile, 'pt-51': mobile}">
        <category-select
                @on-select="setCategoryId"
                class="pl-60 pr-4"
                :class="{'mt-14': !mobile, 'mt-15': mobile}"
                :current="categoryId"
        />
        <button @click="getUserRating">check</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState} from 'vuex';
    import CategorySelect from "../reusableСomponents/categorySelect";
    export default {
        name: "raitingInstance",
        components: {CategorySelect},
        data() {
            return {
                categoryId : 1,
                mobile:this.$root.mobile,
                rating:'',

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



            getUserRating() {
                axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/${this.categoryId}`, {
                    params: {
                        year:2019,
                        month:6
                    }
                })
                    .then(({data}) => { this.rating = data })
            }
        }
    }
</script>

<style lang="scss">

</style>