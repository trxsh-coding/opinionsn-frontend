<template>

	<section class="translations flex-column flex-align-center mx-auto mb-auto mt-100 px-20 py-30">
		<span class="headline">Добавить переводы</span>

		<re-input :params="{width: '100%', label: { width: '100%' }}" input-class="mt-7"
		          :preset="2" placeholder="Ключ" v-model="form.key" />

		<re-input :params="{width: '100%', label: { width: '100%' }}" class="mt-20" input-class="mt-7"
		          :preset="2" placeholder="Значение" v-model="form.value" />

		<div class="btns flex mt-20">
			<button-reusable
					@click.native="onSubmit"
					font-size="13"
					class="v-center py-7 px-13"
					bor-rad="6"
					bg-color="#4b97b4"
					color="#ffffff"
					active-color="#4B97B4"
					description="save"/>

			<button-reusable
					@click.native="onCancel"
					font-size="13"
					class="v-center py-7 px-13 ml-30"
					bor-rad="6"
					bg-color="#BCBEC3"
					color="#ffffff"
					active-color="#4B97B4"
					description="clear"/>

			<re-switcher
					class="switch flex-reverse ml-30"
					caption-class="ml-15"
					v-model="form.lang"
					:caption="form.lang ? 'English' : 'Русский'"
					:params="{width: 50, height: 25, color: '#BCBEC3', active_color: '#4b97b4'}"/>
		</div>

	</section>

</template>

<script>
	import axios from "axios";
	import ReSwitcher from "@/components/reusableСomponents/ReSwitcher";
	import InputReusable from "@/components/reusableСomponents/InputReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";
	import ReInput from "@/components/reusableСomponents/ReInput";

	export default {
		name: "addTranslations",
		components: {ReInput, ButtonReusable, InputReusable, ReSwitcher},
		data() {
			return {
				form: {
					key: "",
					value: "",
					lang: false
				}
			};
		},
		methods: {

			onSubmit() {
				let { key, value } = this.form;
				let lang = this.form.lang ? "en" : "ru";

				axios
					.put(`${process.env.VUE_APP_MAIN_API}/rest/v1/locale/${lang}`, null, {
						params: { key, value }
					})
					.then(({status}) => {

						if (status === 200) {
							this.$popup.insert('messages', [{message: 'Успешно сохранено!', type: 'success'}]);
							this.form = {
								...this.form,
								key: "",
								value: ""
							};
						} else {
							this.$popup.insert('messages', [{message: 'Ошибка при сохранении!', type: 'error'}]);
						}

					})
					.catch(err => console.warn(err));
			},

			onCancel() {
				this.form = {
					...this.form,
					key: "",
					value: ""
				};
			}
		}
	};
</script>

<style lang="scss">
	.translations {

		position: relative;
		width: 50%;
		background: #fff;
		border-radius: 6px;

		.headline {
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 28px;
			color: #1A1E22;
		}

		.btns {
			width: 100%;
			justify-content: center;

			.switch {
				width: 130px;
			}
		}

	}
</style>
