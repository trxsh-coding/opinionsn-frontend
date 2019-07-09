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
        props: {
			time: {
				required: true
			},
		},
        computed: {

            transformed_time:function () {

                let transformed_time = this.time;

                let now = moment(new Date());

                let isToday = now.format("YYYYMMDD") === moment(transformed_time).format("YYYYMMDD");


                // let diff = moment.duration(now.diff(transformed_time))
				//
				//
                // if(diff.asHours() > 24) {
                //     return `${moment(transformed_time).fromNow(true)} : ${diff.asHours()}`
				//
				//
                // } else {
				//
                //     return `${moment(transformed_time).format('HH:mm')} : ${diff.asHours()}`
				//
                //     //return moment(transformed_time).format('HH:mm')
				//
                // }

                let parsedTime = isToday ? moment(transformed_time).format('HH:mm') : moment(transformed_time).fromNow('D');

				return parsedTime;

            }

        }
    }
</script>

<style scoped>

</style>
