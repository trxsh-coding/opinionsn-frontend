<template>
	
	<div v-if="items.length" class="popup-wrapper">
		<template v-for="({message, type}) in items">
			<div v-if="type === 'error'" class="popup-notify error mb-10">
				<icon-base
						class="mb-auto"
						fill="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 174.239 174.239"
						icon-name="icon-error">
					<icon-error />
				</icon-base>
				
				<span class="ml-10 mr-8">{{message}}</span>
				
				<icon-base
						class="mb-auto ml-auto"
						fill="none"
						stroke="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 19 19"
						icon-name="close">
					<icon-cross/>
				</icon-base>
			</div>
			
			<div v-if="type === 'success'" class="popup-notify success mb-10">
				<icon-base
						class="mb-auto"
						fill="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 512 512"
						icon-name="icon-success">
					<icon-success />
				</icon-base>
				
				<span class="ml-10 mr-8">{{message}}</span>
				
				<icon-base
						class="mb-auto ml-auto"
						fill="none"
						stroke="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 19 19"
						icon-name="close">
					<icon-cross/>
				</icon-base>
			</div>
			
			<div v-if="type === 'warning'" class="popup-notify warning mb-10">
				<icon-base
						class="mb-auto"
						fill="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 330 330"
						icon-name="icon-warning">
					<icon-warning />
				</icon-base>
				
				<span class="ml-10 mr-8">{{message}}</span>
				
				<icon-base
						class="mb-auto ml-auto"
						fill="none"
						stroke="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 19 19"
						icon-name="close">
					<icon-cross/>
				</icon-base>
			</div>
		</template>
	</div>
	
</template>

<script>
	import IconBase from "./icons/IconBase";
	import IconCross from "./icons/IconCross";
	import IconError from "./icons/IconError";
	import IconSuccess from "./icons/IconSuccess";
	import IconWarning from "./icons/IconWarning";
	
	export default {
		name: "PopupNotifications",
		components: {
			IconBase,
			IconCross,
			IconError,
			IconSuccess,
			IconWarning
		},
		// props: {
		// 	items: {
		// 		type: Array,
		// 		required: true,
		// 		default() { return [] }
		// 	}
		// }
		computed: {
			items() {
				return this.$popup.messages;
			}
		},
	}
</script>

<style lang="scss">
	.popup-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.popup-notify {
			width: 380px;
			min-height: 48px;
			border-radius: 6px;
			padding: 15px 10px;
			display: flex;
			align-items: center;
			word-break: break-all;
			color: #3d3d3d;
			
			&.error {
				background: #ff000026;
			}
			
			&.success {
				background: #00ff2b26;
			}
			
			&.warning {
				background: #fafa0026;
			}
			
		}
	}
</style>