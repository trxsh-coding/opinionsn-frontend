<template>
    <div class="sub-notification">
       <slot>
       <avatar :author="author" />
        <span class="username">{{author.username}}</span>
        <span class="message">На вас подписался</span>
       </slot>
    </div>
</template>

<script>
    import avatar from '../../modules/avatar'
    export default {
        name: "SUBSCRIBE",
        props:['author'],
        components:{avatar}
    }
</script>

<style lang="scss">

</style>
