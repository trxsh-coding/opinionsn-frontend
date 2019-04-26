<template>
    <div class="prediction-notification">
        <slot>
            <avatar  :author="author" />
            <span class="username">{{author.username}}</span>
            <span class="message" >Создал новый опрос</span>
            <span class="poll pointer" @click="pollLink(targetId)">{{pollName}}</span>
        </slot>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "NEW_POLL",
        props:['author', 'pollName', 'targetId'],
        components:{avatar},
        methods:{

            pollLink(targetId) {
                this.$router.push({name: 'singlePoll', params: {id: targetId}})
            }

        }
    }
</script>

<style lang="scss">

</style>
