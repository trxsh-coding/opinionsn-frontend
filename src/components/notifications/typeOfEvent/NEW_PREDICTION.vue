<template>
    <div class="prediction-notification">
        <slot>
            <avatar :author="author" />
            <span class="username">{{author.username}}</span>
            <span class="message">Автор из ваших подписок создал новый Прогноз</span>
        </slot>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "NEW_PREDICTION",
        props:['author'],
        components:{avatar}
    }
</script>

<style lang="scss">

</style>
