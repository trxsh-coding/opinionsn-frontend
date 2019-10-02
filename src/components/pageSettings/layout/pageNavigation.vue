<template>
	<div class="navigation flex-between flex-align-center">
		<lang-string @click.native="setInitForm" class="cancel-btn pointer" title="cancel"/>
		<lang-string class="title" title="edit_profile"/>
		<lang-string @click.native="sendForm" class="submit-btn pointer" title="save"/>
	</div>
</template>

<script>
	import langString from "../../langString";
	import {mapState} from "vuex";

	export default {
		name: "pageNavigation",
		components: {
			langString
		},

		computed: {
			...mapState('globalStore', {
				mainUser: s => s.mainUser
			}),

			...mapState('formManagment', {
				form: s => s.edit_form
			})
		},

		methods: {

			setInitForm() {
				this.$store.commit('formManagment/SET_INITIAL_FORM', {form: 'edit_form', value: {...this.mainUser}});
				this.$emit('update');
			},

			sendForm() {

				// let { errors = {} } = this.form;
				//
				// let errors_summary = Object.values(errors).flatMap(err => Object.values(err));
				// errors_summary = errors_summary.flatMap(err => {
				//
				//     switch (true) {
				//         case err === null:
				//             return err;
				//         case typeof err === 'object':
				//             return Object.values(err);
				//         default:
				//             return err;
				//     }
				//
				// });
				//
				// let has_errors = errors_summary.some(err => err !== null);
				//

				this.$store.dispatch('formManagment/SUBMIT_USERPAGE_FORM', this.form)
					.then(success => {
						if (success) {
							this.$store.commit('formManagment/SET_INITIAL_FORM', {
								form: 'edit_form',
								value: {...this.mainUser, errors: {}}
							});
							this.$popup.insert('messages', [{message: 'Успешно!', type: 'success'}]);
							this.$emit('update');
						} else {
							// Если есть ошибки с сервера - затолкаем их в стор.
							res.data.forEach(({field, errorCode, msg}) => {
								this.$store.commit('formManagment/UPDATE_ERROR_FIELD', {
									form: 'edit_form',
									key: field,
									error_key: errorCode,
									value: msg
								});
							});
							this.$popup.insert('messages', [{
								message: 'Невозможно отредактировать, ошибка в заполнении!',
								type: 'error'
							}]);
						}
					});

			}

		},
	}
</script>

<style lang="scss">

	.navigation {

		.cancel-btn {
			font-weight: normal;
			font-size: 13px;
			color: #BCBEC3;
		}

		.title {
			font-weight: bold;
			font-size: 17px;
			color: #4B97B4;
		}

		.submit-btn {
			font-weight: normal;
			font-size: 13px;
			color: #1A1E22;
		}

	}

</style>