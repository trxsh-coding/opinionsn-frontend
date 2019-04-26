<template>
    <div class="notification-new-user">
        <icon-base
                fill="none"
                class="icon logo"
                width="35"
                height="35"
                viewBox="0 0 40 30"
                icon-name="logo"><icon-logo />
        </icon-base>
        <span class="notification-span">Добро пожаловать в opinion!</span>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconLogo from '../../icons/IconLogo'

    export default {
        name: "NEW_USER",
        components:{IconBase, IconLogo},

    }
</script>

<style scoped>

</style>
