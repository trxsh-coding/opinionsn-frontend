<template>
    <div class="notification-appointment-of-judges">

        <div class="blockchain__item">
            <icon-base
                    class="mr-10"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    icon-name="etherium"><icon-etherium/>
            </icon-base>
        </div>

        <div class="notification-text wb">
            <span class="message">Блокчейн-прогноз <span class="poll pointer" @click="pollLink(targetId)">{{pollName}}</span> завершен</span>
        </div>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconJudge from '../../icons/IconJudge'
    import IconEtherium from '../../icons/IconEtherium'

    export default {
        props:['pollName','targetId'],
        name: "BLOCKCHAIN_PREDICTION_FINISHED",
        components:{IconBase, IconJudge, IconEtherium},
        methods: {

            pollLink(targetId) {
                this.$router.push({name: 'singlePoll', params: {id: targetId}})
            }

        }

    }
</script>

<style scoped>

</style>
