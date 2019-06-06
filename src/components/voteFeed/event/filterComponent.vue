<template>
    <div class="filter-wrapper " @click="setFilter(author.id)" >


        <div class="author-picture pointer" :style="{ 'background-image': 'url(' + publicPath + imageUtil(author.path_to_avatar, 'S') + ')' }">

        </div>


        <span>
            {{author.username}}
        </span>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import avatar from '../../modules/adaptiveAvatar'
    import imageMixin from "../../mixins/imageMixin";
    export default {
        props:['following'],
        name: "filterComponent",
        components:{avatar},
        mixins:[imageMixin],
        data(){

            return {

                publicPath: process.env.VUE_APP_MAIN_API

            }

        },
        computed: {
            ...mapState('globalStore', {
                users: ({users}) =>users,
            }),

            author: function () {

                let {following, users} = this;


                return users[following.id] || {}


            }

        },

        methods: {

            setFilter(id){

                this.$store.commit('voteFeed/setFilterId', id)

                this.$store.dispatch('voteFeed/list')

            }

        }
    }
</script>

<style lang="scss">
    .filter-wrapper {
        margin-right: 21px;
        text-align: center;
        .author-picture {
            margin-bottom: 5px;
            width: 60px;
            height: 60px;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 100px;

        }

    }
</style>


