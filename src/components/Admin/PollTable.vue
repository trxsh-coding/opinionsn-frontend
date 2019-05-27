<template lang="html">
	<el-table
		:data="tableData"
		border
		style="width: 100%"
		max-height="100%">
		<el-table-column type="expand">
			<template slot-scope="props">
				<p v-for="option in props.row.options">{{ option }}</p>
			</template>
		</el-table-column>
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
			prop="name">
		</el-table-column>
		<el-table-column
			width="190"
			label="Действия">
			<template slot-scope="scope">
				<el-button
					size="mini"
					@click="handleClose(scope.$index, scope.row)">Закрыть</el-button>
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import { mapState } from "vuex";
	import moment from "moment";

	export default {
        name: "PollTable",
		props: ['poll_type'],
		computed: {
			...mapState("pollFeed", {
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
				let data = {};

				polls.forEach((item, index) => {

					let { id, timestamp } = item,
						{ subject: name, description, options_id } = globalStorePolls[id],
						date = moment(timestamp).format('LLL'),
						options = [];

					options_id.forEach((id) => {
						options.push(globalStoreOptions[id].description);
					});

					data[index] = {
						id,
						date,
						name,
						description,
						options
					};
				});

				return data;
			}
		},
		methods: {
			handleClose(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		},
		created() {
			this.$store.dispatch(`pollFeed/list`);
		}
	}
</script>

<style lang="scss">
	.admin-wrapper .el-table {
		margin: 0 10px;

		* {
			text-align: center !important;
		}
	}
</style>