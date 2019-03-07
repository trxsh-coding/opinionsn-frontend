<template>
    <div class="comment-section" >
        {{vote}}

    </div>
</template>

<script>
    import IconBase from '../../../icons/IconBase.vue'
    import IconAccept from '../../../icons/IconAccept.vue'
    import IconMoney from '../../../icons/IconMoney.vue'
    import IconTime from '../../../icons/IconTime.vue'
    import IconReplied from '../../../icons/IconReplied.vue'
    import langString from '../../../langString.vue'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                comment_description:null
            }
        },

        name: "CommentSection",
        props: ['explain', 'item', 'comments'],
        computed: {

            ...mapState('globalStore', {

                commentMap: ({comments}) => comments

            }),



            comment: function () {
                let {comments, commentMap} = this;

                return comments.map(comment_id => {
                    let comment = commentMap[comment_id];
                    return comment
                });

            }

        },




        },

        components: {
            IconBase,
            IconTime,
            IconMoney,
            IconAccept,
            IconReplied,
            langString

        },

    }

</script>

<style lang="scss">
    .explain-section {
        margin: 20px;
        padding: 5px;
        border: 1px solid green;
    }
</style>
