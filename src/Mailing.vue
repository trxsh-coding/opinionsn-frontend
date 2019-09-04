<template>
	<section class="mailing-section v-center flex-column">
		<div class="navbar-brand flex-column flex-align-center">
			<div class="navbar__item navbar__item-1">
				<icon-base
						fill="none"
						class="icon"
						width="150"
						height="150"
						viewBox="0 0 25 24"
						icon-name="logo">
					<icon-logo/>
				</icon-base>
			</div>
			
			<div class="navbar__item navbar__item-2 v-center mt-20">
				<icon-base
						fill="none"
						class="icon-text"
						width="180"
						height="42"
						viewBox="0 0 65 15"
						icon-name="text-logo">
					<icon-text-logo/>
				</icon-base>
			</div>
		</div>
		
		
		<button v-if="query" class="mt-60 p-9" :class="{'inactive': !button_inactive}" @click="unsubscribe">
			Отписаться от рассылки
		</button>
		
		<span v-else class="mt-60">Неверная ссылка!</span>
	
	</section>
</template>

<script>
	import IconBase from "@/components/icons/IconBase";
	import IconLogo from "@/components/icons/IconLogo";
	import IconTextLogo from "@/components/icons/IconTextLogo";
	import axios from "axios";
	
	export default {
		name: "Mailing",
		components: {IconTextLogo, IconLogo, IconBase},
		data() {
			return {
				button_inactive: true
			}
		},
		computed: {
			query() {
				let {query = {}} = this.$route;
				if (query.hasOwnProperty('uuid') && query.hasOwnProperty('id')) {
					
					return {
						uuid: query.uuid,
						id: query.id
					};
					
				} else {
					return null;
				}
			}
		},
		methods: {
			unsubscribe() {
				if (this.button_inactive) {
					axios.get(`${process.env.VUE_APP_MAIN_API}/newsletter/unsubscribe`, {
						params: this.query
					})
						.then(({status}) => {
							if (status === 200) {
								this.$popup.insert('messages', [{
									message: 'Вы успешно отписались!',
									type: 'success'
								}]);
								this.button_inactive = false;
							}
						})
						.catch((error) => this.$popup.insert('messages', [{
							message: `При отписке произошла ошибка!`,
							type: 'error'
						}]))
				}
			}
		}
	}
</script>

<style lang="scss">
	.mailing-section {
		height: 100%;
		
		button {
			all: unset;
			cursor: pointer;
			user-select: none;
			background: #4B97B4;
			border-radius: 6px;
			text-transform: uppercase;
			
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			color: #FFFFFF;
			
			&.inactive {
				background: #ADAFB3;
			}
		}
		
		span {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 24px;
			color: #000000;
		}
	}
</style>