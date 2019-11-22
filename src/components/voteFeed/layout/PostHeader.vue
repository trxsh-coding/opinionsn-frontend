<template>
	<div class="post-header flex-align-stretch">
		<router-link class="pointer flex" :class="{'ml-30': $root.mobile}"
		             :to="{name: 'user', params: {id}}">
			<RePicture :url="path_to_avatar | addAssetsPath" size="36" rounded />
		</router-link>
		
		<div class="caption flex-column ml-9">
			<div class="flex">
				<span class="username">{{username}}</span>
				<span class="event-type ml-5">{{normalizedEventType}}</span>
			</div>
			
			<TimeTrans class="timestamp mt-7" transformedTime :time="timestamp"/>
		</div>
	</div>
</template>

<script>
	import RePicture from "@/components/reusableСomponents/RePicture";
	import TimeTrans from "@/components/timeTrans";

	export default {
		name: "PostHeader",
		
		components: {TimeTrans, RePicture},

		props: {
			id: Number,
			path_to_avatar: String,
			username: String,
			eventType: String,
			timestamp: String
		},
		
		computed: {
			normalizedEventType() {

				switch (this.eventType) {
					case 'VOTED_AND_EXPLAINED':
						return "voted_and_commented";
					case 'VOTED':
						return "voted";
					default:
						return ""
				}

			},
		},
	}
</script>

<style lang="scss">
	.post-header {
		font-family: Roboto;
		font-style: normal;
		
		.caption {
			
			.username {
				font-weight: 500;
				font-size: 15px;
				color: #1A1E22;
			}
			
			.event-type {
				font-weight: normal;
				font-size: 13px;
				color: #1A1E22;
			}
			
			.timestamp {
				font-weight: normal;
				font-size: 11px;
				color: #ADAFB3;
			}
			
		}
	}
</style>