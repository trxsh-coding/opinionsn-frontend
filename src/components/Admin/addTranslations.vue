<template>
	<el-form :model="form" size="medium">
		<h1>Добавить переводы</h1>
		<el-form-item label-width="60px" :label="switchLabel">
			<el-switch v-model="form.lang"></el-switch>
		</el-form-item>
		<el-form-item label="Ключ">
			<el-input v-model="form.key"></el-input>
		</el-form-item>
		<el-form-item label="Значение">
			<el-input v-model="form.value"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">Добавить</el-button>
			<el-button @click="onCancel">Очистить</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import axios from "axios";

	export default {
		name: "addTranslations",
		data() {
			return {
				form: {
					key: "",
					value: "",
					lang: false
				}
			};
		},
		computed: {
			switchLabel() {
				return this.form.lang ? "English" : "Русский";
			}
		},
		methods: {
			onSubmit() {
				let { key, value } = this.form;
				let lang = this.form.lang ? "en" : "ru";

				axios
					.post(`/api/rest/locale/add/${lang}`, null, {
						params: { key, value }
					})
					.then(response => console.log(response.status))
					.catch(err => console.warn(err));
			},
			onCancel() {
				this.form = {
					key: "",
					value_ru: "",
					value_en: ""
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.el-form {
		width: 50%;
	}
</style>