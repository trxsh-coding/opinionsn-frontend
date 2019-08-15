<template>
	
	<section class="predictions">
		<div class="flex-table">
			<ul class="head f-row">
				<li class="id">ID</li>
				<li class="date">Дата</li>
				<li class="name">Название</li>
				<li class="description">Описание</li>
				<li class="dropdown">Варианты</li>
			</ul>
		</div>
	</section>
	
</template>

<script>
	import { mapState } from "vuex";
	import moment from "moment";
	import MugenScroll from "vue-mugen-scroll";

	export default {
        name: "PollTable",
		props: ['prediction_type'],
		watch: {
			prediction_type() {
				this.$store.dispatch(`adminPage/list`, {predictionListOfType: this.prediction_type});
			}
		},
		computed: {
			...mapState("adminPage", {
				payload: ({ items }) => items,
				loading: ({ is_finished }) => is_finished
			}),

			...mapState("globalStore", {
				polls: ({ polls }) => polls,
				pollOptions: ({ options }) => options
			}),

			table_data() {
				moment.locale('ru');
				let { payload, polls, pollOptions } = this;
				let map = [];

				payload.forEach(({ID}, index) => {
					let { subject: name, description, date, options_id } = polls[ID];

					date = moment(date).format('l');

					let options = [];
					options_id.forEach((ID, i) => {
						options[i] = pollOptions[ID];
					});

					map[i] = {
						ID,
						date,
						name,
						description,
						options
					}
				});

				return map || [];
			}
		},
		methods: {
			loadNextPage() {
				this.$store.dispatch(`adminPage/loadNextPage`, {predictionListOfType: this.poll_type});
			},
			setRightOption(option_id, poll_id){
				// if (this.poll_type === 'opened') this.$store.dispatch(`pollFeed/setRightOption`, {data: {option_id, poll_id }});

				// пока что сделал выбор опции для всех типов
				this.$store.dispatch(`pollFeed/setRightOption`, {data: {option_id, poll_id }});
			},
			trimString(string, sliceVal) {
				return sliceVal
					? string.length > sliceVal
						? string.slice(0, sliceVal).trim() + "..."
						: string
					: string;
			}
		},
		mounted() {
			this.$store.dispatch(`adminPage/list`, {predictionListOfType: this.poll_type});
		},
	}
</script>

<style lang="scss">

	.predictions {
		/*flex: 1;*/
		width: 100%;
		position: relative;
		padding: 0 20px;
		
		.flex-table {
			position: relative;
			height: 100%;
			width: 100%;
			background: #fff;
			border-radius: 6px;
			padding: 20px;
			
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.head {
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 18px;
				color: #FEFEFE;
				
				li {
					border-radius: 6px;
					background: #4B97B4;
					margin-right: 3px;
				}
			}
			
			.f-row {
				display: flex;
				width: 100%;
				
				li {
					flex: 1;
					padding: 10px 5px;
					text-align: center;
					
					&:last-of-type {
						border: none;
					}
				}
				
				.id {
					flex: 0 0 60px;
				}
				
				.date {
					flex: 0 0 180px;
				}
				
				.name {
					flex: 4 0;
				}
				
				.dropdown {
					flex: 0 0 auto;
				}
			}
			
			.crimson {
				background: crimson;
			}
			
			.yellow {
				background: #ffffad;
			}
		}
		
	}


</style>