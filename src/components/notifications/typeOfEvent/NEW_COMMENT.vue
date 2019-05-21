<template>
    <div class="prediction-notification">
        <slot>
            <avatar class="avatar-30x30" :author="author" />
            <div class="notification-text wb">
                <span class="username">{{author.username}}</span>
                <span class="message">под вашим пояснением опроса</span>
                <span class="poll">{{pollName}}</span>
                <span class="message">оставил(а) комментарий: <i>{{message}}</i></span>
            </div>
        </slot>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "NEW_COMMENT",
        props:['author', 'pollName', 'message'],
        components:{avatar},
        methods: {

            pollLink(targetId) {
                this.$router.push({name: 'singlePoll', params: {id: targetId}})
            }

        }
    }
</script>

<style lang="scss">

</style>
