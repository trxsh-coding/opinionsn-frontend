<template>
    <div class="unsub-notification">
        <slot>
            <avatar :author="author" />
            <span class="username">{{author.username}}</span>
            <span class="message">От вас отписался</span>
        </slot>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "UNSUBSCRIBE",
        props:['author'],
        components:{avatar}
    }
</script>

<style lang="scss">

</style>
