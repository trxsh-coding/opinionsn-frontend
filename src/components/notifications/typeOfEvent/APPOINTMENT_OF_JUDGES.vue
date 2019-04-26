<template>
    <div class="notification-appointment-of-judges">
        <icon-base
                class="mr-10"
                v-if="notification.eventType === 'APPOINTMENT_OF_JUDGES'"
                fill="#152D3A"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                icon-name="judge"><icon-judge/>
        </icon-base>

        <span class="notification-span">Вы были назначены судьёй</span>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconJudge from '../../icons/IconJudge'
    export default {
        name: "APPOINTMENT_OF_JUDGES",
        components:{IconBase, IconJudge},

    }
</script>

<style scoped>

</style>
