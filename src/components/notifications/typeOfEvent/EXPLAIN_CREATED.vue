<template>
    <div class="explain-notification">
        <avatar class="avatar-30x30" :author="author" />
        <div class="notification-text wb">
            <span class="username pointer">{{author.username}}</span>
            <span class="message">под вашим пояснением вопроса</span>
            <span class="poll pointer" @click="pollLink(targetId)">{{pollName}}</span>
            <span class="message">оставил(а) комментарий: {{message}}</span>
        </div>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "EXPLAIN_CREATED",
        props:['author', 'pollName', 'message', 'targetId'],
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
