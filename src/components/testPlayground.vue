<template>
    <div class="wrapper-box">
	
	    <re-input :preset="2" textarea placeholder="username" input-class="pb-5"
	              :params="{width: 271, fontSize: 16}" v-model="input_value"/>

	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import axios from "axios";
	import ReInput from "@/components/reusableСomponents/ReInput";
	
	export default {
        name: "testPlayground",
		components: {
			ReInput,
		},
		data() {
			return {
				input_value: '',
			}
		},
		computed: {

			...mapState('globalStore', {
				polls: ({polls}) =>polls,
			}),

		},
		methods: {
			
			getUserRating() {
				// axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/1?month=6&year=2019`)
				// 	.then(({data}) => { this.statistic = data })
				axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/rating/kek`)
					.then(({data}) => { this.statistic = data })
			}
			
		},
	}
</script>

<style lang="scss">
	.wrapper-box {
		width: 100%;
		margin-left: 20px;
		border-radius: 6px;
		background: #ffffff;
		
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

		.crimson-div {
			width: 40px;
			height: 40px;
			background-color: crimson;
		}

		.blue-div {
			/*position: fixed;*/
			/*left: 20%;*/
			width: 40px;
			height: 40px;
			background-color: blue;
		}
		
		.green-div {
			position: fixed;
			left: 30%;
			width: 40px;
			height: 40px;
			background-color: green;
		}

		.test-wrapper {
			position: relative;
			width: 300px;
			height: 300px;

			margin-left: 50%;
			transform: translateX(-50%);
		}

		.dropdown-list-reusable {
			left: 100px;
		}

	}

	textarea {
		width: 200px;
		height: 40px;
		overflow: scroll;
		resize: none;
	}
</style>
