<template>
    <div class="sub-notification">
       <slot>
       <avatar class="avatar-30x30" :author="author" />
	   <div class="notification-text">
			<span class="username">{{author.username}}</span>
			<span class="message">На вас подписался</span>
	   </div>
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
