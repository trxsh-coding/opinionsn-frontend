<template>
    <div class="notification-new-user">
		<div class="icon logo picture-20x20 mr-6" :style="{ 'background-image': 'url(' + require('../../assets/icons/icon-logo.png') + ')' } " />
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
