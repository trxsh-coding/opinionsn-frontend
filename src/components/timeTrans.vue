<template>
    <div class="timestamp-block">
        <span>{{transformed_time}}</span>
    </div>
</template>

<script>
    import moment from 'moment'
    import langMixin from './mixins/langMixin'
    export default {
        name: "timeTrans",
        mixins:[langMixin],
        props:['time'],
        computed: {

            transformed_time:function () {

                let transformed_time = this.time;

                let now = moment(new Date())

                let diff = moment.duration(now.diff(transformed_time))


                if(diff.asHours() > 24) {

                    return moment(transformed_time).fromNow(true)


                } else {

                    return moment(transformed_time).format('HH:mm')

                }

            }

        }
    }
</script>

<style scoped>

</style>
