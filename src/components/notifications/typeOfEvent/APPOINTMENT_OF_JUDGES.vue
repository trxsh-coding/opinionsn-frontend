<template>
    <div class="notification-appointment-of-judges">
        <icon-base
                class="mr-10"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                icon-name="etherium"><icon-etherium/>
        </icon-base>

        <div class="notification-text wb">
            <span class="message">Вы были назначены судьёй в прогнозе</span> <span class="poll pointer" @click="pollLink(targetId)">{{pollName}}</span>
        </div>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconJudge from '../../icons/IconJudge'
    import IconEtherium from '../../icons/IconEtherium'

    export default {
        name: "APPOINTMENT_OF_JUDGES",
        components:{IconBase, IconJudge, IconEtherium},
        props:['pollName','targetId'],
        methods: {

            pollLink(targetId) {
                this.$router.push({name: 'singlePoll', params: {id: targetId}})
            }

        }

    }
</script>

<style scoped>

</style>
