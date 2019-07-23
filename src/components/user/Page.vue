<template>
    <div id="mypage" class="user-page" :class="{'bg-white': !mobile}">

		<page-header :user="user" :main-user="main_user" />

		<page-info class="mt-9" :user="user" />

		<page-statistics class="mt-18" />

		<page-feed class="mt-24" />


    </div>
</template>

<script>
    import { mapState } from 'vuex';
	import PageHeader from "./layout/PageHeader";
	import PageInfo from "./layout/PageInfo";
	import PageStatistics from "./layout/PageStatistics";
	import PageFeed from "./layout/PageFeed";

    export default {
        name: "userPage",
        computed: {
            ...mapState('userPage', {
				userPage: s => s,
            }),

			...mapState('globalStore', {
				users: ({users}) => users
			}),

            // beforeRouteLeave(to, from, next) {
			//
            //     this.$store.commit('userPage/hideForm', true).then(next)
			//
			//
            // },

            user_id() {
                return this.$route.params.id
            },

			user() {
				return this.users[this.user_id];
			},

			main_user() {
            	let {main_user_id} = this.userPage;

				return this.users[main_user_id];
			}


        },
        watch: {
			user_id(oldUserId, newUserId) {
                if (oldUserId !== newUserId) this.getUserPage();
            }
        },
        methods: {

            getUserPage(){

                this.$store.dispatch(`userPage/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/user/${this.user_id}`});

            }


        },
		//
        components: {
			PageFeed,
			PageStatistics,
			PageInfo ,
			PageHeader,
        },
		//
        mounted(){

            this.getUserPage()

        }
    }

</script>

<style lang="scss">
    #mypage {
		position: relative;
		width: 100%;
    }

	.user-page {
		position: relative;
		width: 100%;
		border-radius: 6px;
	}
</style>
