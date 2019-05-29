<template lang="html">
	<el-table
		:data="tableData"
		border
		style="width: 100%"
		max-height="100%">
		<el-table-column
			label="ID"
			prop="id"
			width="60">
		</el-table-column>
		<el-table-column
			label="Дата"
			prop="date"
			width="210">
		</el-table-column>
		<el-table-column
			label="Название"
			width="230">
			<template slot-scope="scope">
				<el-popover
					placement="top"
					width="230"
					trigger="click">
					<div class="text-center">{{scope.row.name}}</div>
					<div slot="reference" class="pointer trim"><span slot="reference" class="trim">{{scope.row.name}}</span></div>
				</el-popover>
			</template>
		</el-table-column>
		<el-table-column
			label="Описание">
			<template slot-scope="scope">
				<el-popover
					placement="top"
					width="600"
					trigger="click">
					<div class="text-center">{{scope.row.description}}</div>
					<div slot="reference" class="pointer trim"><span class="trim">{{scope.row.description}}</span></div>
				</el-popover>
			</template>
		</el-table-column>
		<el-table-column type="expand">
			<template slot-scope="props">
				<div class="description-block">
					<div v-for="(option, i) in props.row.options" :key="i">
						<el-button v-if="option.isVoted" type="primary" icon="el-icon-check" class="mr-6"/>
						<el-button v-else type="primary" plain icon="el-icon-check" class="mr-6"/>
						<span>{{ option.description }}</span>
					</div>
				</div>
			</template>
		</el-table-column>
		<el-table-column
			width="190"
			label="Действия">
			<template slot-scope="scope">
				<el-button
					size="mini"
					@click="load">Закрыть</el-button>
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import moment from "moment";
	import { mapState } from "vuex";

	export default {
        name: "PollTable",
		props: ['poll_type'],
		computed: {
			...mapState("adminPage", {
				polls: ({ items }) => items,
				loading: ({ is_finished }) => is_finished
			}),

			...mapState('globalStore', {
				globalStorePolls: ({ polls }) => polls,
				globalStoreOptions: ({ options }) => options,
			}),

			tableData() {
				moment.locale('ru');
				let { polls, globalStorePolls, globalStoreOptions } = this;
				let data = [];

				polls.forEach((item) => {

					let { id, timestamp } = item,
						{ subject: name, description, options_id, correct_option, type_of_poll } = globalStorePolls[id],
						date = moment(timestamp).format('LLL'),
						options = {};

					// Если не прогноз, то пропускаем итерацию
					// if (type_of_poll !== 1) return;

					options_id.forEach((id, index) => {
						let { description } = globalStoreOptions[id],
							isVoted = correct_option === id;

						options[index] = {
							description,
							isVoted
						};
					});

					data.push({
						id,
						date,
						name,
						description,
						options,
						type_of_poll
					});
				});

				return data;
			}
		},
		methods: {
        	load() {
				this.$store.dispatch(`pollFeed/loadNextPage`);
			},
			handleClose(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			trimString(string, sliceVal) {
				return sliceVal
					? string.length > sliceVal
						? string.slice(0, sliceVal).trim() + "..."
						: string
					: string;
			}
		},
		created() {
			// this.$store.dispatch(`pollFeed/list`);
			this.$store.dispatch(`adminPage/loadNextPage`);
			this.$store.dispatch(`adminPage/list`);
		}
	}
</script>

<style lang="scss">
	.admin-wrapper .el-table {
		margin: 0 10px;

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
</style>