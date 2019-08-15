<template>
	
	<section class="translations flex-column flex-align-center mx-auto mb-auto mt-100 px-20 py-30">
		<span class="headline">Добавить переводы</span>
		
		<input-reusable class="mx-auto my-20"
		                :value="form.key"
		                @change="updateField(arguments[0], 'key')"
		                inputPlaceholder="Ключ"
		                width="100%"
		                input
		                with-underline/>
		
		<input-reusable class="mx-auto my-20"
		                :value="form.value"
		                @change="updateField(arguments[0], 'value')"
		                inputPlaceholder="Значение"
		                width="100%"
		                input
		                with-underline/>
		
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
			
			<switcher-reusable
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
	import SwitcherReusable from "@/components/reusableСomponents/SwitcherReusable";
	import InputReusable from "@/components/reusableСomponents/InputReusable";
	import ButtonReusable from "@/components/reusableСomponents/ButtonReusable";

	export default {
		name: "addTranslations",
		components: {ButtonReusable, InputReusable, SwitcherReusable},
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
			
			updateField(val, key) {
				this.form[key] = val;
			},
			
			onSubmit() {
				let { key, value } = this.form;
				let lang = this.form.lang ? "en" : "ru";

				axios
					.put(`${process.env.VUE_APP_MAIN_API}/rest/v1/locale/${lang}`, null, {
						params: { key, value }
					})
					.then(({status}) => {
						
						if (status === 200) {
							alert("Сохранено успешно!");
							this.form = {
								...this.form,
								key: "",
								value: ""
							};
						} else {
							alert("Ошибка при сохранении!");
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