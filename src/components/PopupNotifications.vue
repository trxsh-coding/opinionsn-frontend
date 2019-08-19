<template>
	
	<transition-group name="popup-list" tag="div" class="popup-wrapper">
		
		<div v-for="({message, type}, index) in items" :key="'popup' + index">
			
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
						@click.native="closeMessage(index)"
						class="close-icon mb-auto ml-auto pointer"
						fill="#3d3d3d"
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
						@click.native="closeMessage(index)"
						class="close-icon mb-auto ml-auto pointer"
						fill="#3d3d3d"
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
						@click.native="closeMessage(index)"
						class="close-icon mb-auto ml-auto pointer"
						fill="#3d3d3d"
						stroke="#3d3d3d"
						width="20"
						height="20"
						viewBox="0 0 19 19"
						icon-name="close">
					<icon-cross/>
				</icon-base>
			</div>
		</div>
		
	</transition-group>
		
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
		data() {
			return {
				interval_id: null
			}
		},
		watch: {
			items() {
				clearInterval(this.interval_id);
				if (this.items.length) this.clearOldMessage();
			}
		},
		computed: {
			items() {
				return this.$popup.messages;
			}
		},
		methods: {
			clearOldMessage() {
				this.interval_id = setInterval(() => {
					if (this.items.length) this.$popup.remove('messages', [0]);
				}, 2000);
			},
			
			closeMessage(index) {
				clearInterval(this.interval_id);
				this.$popup.remove('messages', [index]);
				if (this.items.length) this.clearOldMessage();
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrapper {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999999999999;
		
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
			word-break: break-word;
			color: #3d3d3d;
			font-size: 15px;
			
			&.error {
				background: #d9b2b2db;
			}
			
			&.success {
				background: #a3dfaddb;
			}
			
			&.warning {
				background: #dfdf98db;
			}
			
			@media only screen and (max-width: 400px) {
				width: 90vw;
			}
			
		}
	}
	
	.popup-list-enter-active,
	.popup-list-leave-active {
		transition: all 0.5s;
	}
	
	.popup-list-enter,
	.popup-list-leave-to {
		opacity: 0;
	}
	
	.popup-list-move {
		transition: transform 0.5s;
	}
</style>