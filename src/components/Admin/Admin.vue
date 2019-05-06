<template>
	<div class="admin-wrapper relative height-100">
		<!-- <router-link to="/admin/catalog">
            <el-button type="primary" size="small" round>
                Каталог
            </el-button>
        </router-link>
		<router-view/>-->

		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside width="250px" style="background-color: rgb(238, 241, 246)">
				<el-menu>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-message"></i>API
						</template>
						<el-menu-item index="1-1">Добавить переводы</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-menu"></i>Пользователи
						</template>
						<el-menu-item index="2-1">Добавить</el-menu-item>
						<el-menu-item index="2-2">Удалить</el-menu-item>
						<el-menu-item index="2-3">Редактировать</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-setting"></i>Опросы
						</template>
						<el-menu-item index="3-1">Добавить</el-menu-item>
						<el-menu-item index="3-2">Удалить</el-menu-item>
						<el-menu-item index="3-3">Редактировать</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>View</el-dropdown-item>
							<el-dropdown-item>Add</el-dropdown-item>
							<el-dropdown-item>Delete</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>Tom</span>
				</el-header>

				<el-main>
					<el-table :data="tableData">
						<el-table-column prop="date" label="Date" width="140"></el-table-column>
						<el-table-column prop="name" label="Name" width="120"></el-table-column>
						<el-table-column prop="address" label="Address"></el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Catalog from "./Catalog.vue";
	export default {
		name: "Admin",
		data() {
			return {
			};
		},
		components: {
			Catalog
		}
	};
</script>

<style lang="scss">
	// .el-button--primary {
	// 	background: #4b97b4;
	// 	border-color: inherit;
	// }
	// .el-button {
	// 	padding: 10px 20px;
	// }

	.el-header {
		background-color: #b3c0d1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>
