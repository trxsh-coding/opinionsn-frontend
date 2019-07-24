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
                let mTime = moment(transformed_time);

                let now = moment(new Date());

                let isToday = now.format("YYYYMMDD") === mTime.format("YYYYMMDD");

                const daysDiff = now.diff(mTime, 'days');

                const relTime = mTime.fromNow('mm');
                const relTimeParts = relTime.split(' ');
                let text;

                if (relTimeParts.length > 1){
                    const [count, title] = relTime.split(' ');
                    text = `${isNaN(Number(count)) ? '1' : count}${title.substring(0,1)}`;
                } else {
                    text = `${relTime.substr(0, 1).toUpperCase()}${relTime.substr(1, relTime.length)}`;
                }




                let parsedTime = daysDiff > 1 ? mTime.fromNow('d') : text;

				return parsedTime;

            }

        }
    }
</script>

<style scoped>

</style>
