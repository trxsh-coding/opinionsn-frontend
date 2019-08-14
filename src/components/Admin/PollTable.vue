<template lang="html">
<!--	<el-table-->
<!--		class="mx-5"-->
<!--		:data="tableData"-->
<!--		border-->
<!--		style="width: 100%"-->
<!--		height="100%"-->
<!--		ref="el_table">-->
<!--		<el-table-column-->
<!--			label="ID"-->
<!--			prop="ID"-->
<!--			width="60">-->
<!--		</el-table-column>-->
<!--		<el-table-column-->
<!--			label="Дата"-->
<!--			prop="date"-->
<!--			width="210">-->
<!--		</el-table-column>-->
<!--		<el-table-column-->
<!--			label="Название"-->
<!--			width="230">-->
<!--			<template slot-scope="scope">-->
<!--				<el-popover-->
<!--					placement="top"-->
<!--					width="230"-->
<!--					trigger="click">-->
<!--					<div class="text-center">{{scope.row.name}}</div>-->
<!--					<div slot="reference" class="pointer trim"><span slot="reference" class="trim">{{scope.row.name}}</span></div>-->
<!--				</el-popover>-->
<!--			</template>-->
<!--		</el-table-column>-->
<!--		<el-table-column-->
<!--			label="Описание">-->
<!--			<template slot-scope="scope">-->
<!--				<el-popover-->
<!--					placement="top"-->
<!--					width="600"-->
<!--					trigger="click">-->
<!--					<div class="text-center">{{scope.row.description}}</div>-->
<!--					<div slot="reference" class="pointer trim"><span class="trim">{{scope.row.description}}</span></div>-->
<!--				</el-popover>-->
<!--			</template>-->
<!--		</el-table-column>-->
<!--		<el-table-column type="expand">-->
<!--			<template slot-scope="props">-->
<!--				<div class="description-block">-->
<!--					<div v-for="(option, i) in props.row.options" :key="i">-->
<!--						<el-button type="primary" plain icon="el-icon-check" @click="setRightOption(option.id, props.row.ID)" class="mr-6"/>-->
<!--						<span>{{ option.description }}</span>-->
<!--					</div>-->
<!--				</div>-->
<!--			</template>-->
<!--		</el-table-column>-->
<!--		<template slot="append">-->
<!--			<el-button type="primary" class="mt-15" @click="loadNextPage">Загрузить еще...</el-button>-->
<!--		</template>-->
<!--	</el-table>-->
	
	<section class="prediction-table">
		<div class="flex-table">
			<ul class="head">
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
		components: {
			MugenScroll
		},
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

			tableData() {
				moment.locale('ru');
				let { payload, polls, pollOptions } = this;
				let map = [];

				payload.forEach(({ID}, index) => {
					let { subject: name, description, date, options_id } = polls[ID];

					date = moment(date).format('LLL');

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

				return map || {};
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

	.admin-wrapper .el-table {
		overflow: visible !important;

		* {
			text-align: center !important;
		}

		.el-table__expanded-cell {
			.description-block {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				& > * {
					margin: 10px 0;
					padding-right: 6px;
					border: 1px solid #b7d5e1;
					border-radius: 12px;
					.el-button {
						border: 1px solid #b7d5e1;
						border-radius: 12px;
					}
				}
			}
		}

	}

	.loading-spinner {
		width: 100%;
		height: 80px;

		* {
			background-color: transparent;
		}
	}


</style>