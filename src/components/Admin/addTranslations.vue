<template>
	<el-form ref="form" :model="formInline" label-width="120px">
		<el-form-item label="Ключ">
			<el-input v-model="form.key"></el-input>
		</el-form-item>
		<el-form-item label="Русский">
			<el-input v-model="form.value_ru"></el-input>
		</el-form-item>
		<el-form-item label="Английский">
			<el-input v-model="form.value_en"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">Добавить</el-button>
			<el-button @click="onCancel">Очистить</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "addTranslations",
		data() {
			return {
				form: {
					key: "",
					value_ru: "",
					value_en: ""
				}
			};
		},
		methods: {
			onSubmit() {
				alert("submit!");
			},
			onCancel() {
				alert("cancel!");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.el-form {
		width: 90%;
	}
</style>