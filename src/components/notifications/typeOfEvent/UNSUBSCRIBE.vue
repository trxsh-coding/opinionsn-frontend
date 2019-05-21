<template>
    <div class="unsub-notification">
        <slot>
            <avatar class="avatar-30x30" :author="author" />
			<div class="notification-text wb">
	            <span class="username">{{author.username}}</span>
    	        <span class="message">От вас отписался</span>
			</div>
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
