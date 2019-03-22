<template>
    <div class="filter-wrapper " @click="setFilter(author.id)" >

        <bordered-avatar :user="author"/>


        <span>
            {{author.username}}
        </span>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import borderedAvatar from '../../user/Event/modules/borderedAvatar'
    export default {
        props:['following'],
        name: "filterComponent",
        components: {borderedAvatar},
        computed: {
            ...mapState('globalStore', {
                users: ({users}) =>users,
            }),

            author: function () {

                let {following, users} = this;


                return users[following.id]


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
        margin-right: 28px;
        text-align: center;


        .author-picture {
            margin-left: 5px;
            width: 60px;
            height: 60px;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 100px;
            margin-bottom: 5px;

        }

    }
</style>


