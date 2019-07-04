<template>
    <div id="mypage">
		<page-header :user="user" :main-user="main_user" />

		<page-info :user="user" />



    </div>
</template>

<script>
    import { mapState } from 'vuex';
    // import userSection from './Event/userSection'
	import PageHeader from "./layout/PageHeader";
	import PageInfo from "./layout/PageInfo";
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
            id(oldUserId, newUserId) {
                if (oldUserId !== newUserId) this.getUserPage();
            }
        },
        methods: {

            getUserPage(){

                this.$store.dispatch(`userPage/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/getUserById/${this.user_id}`});

            }


        },
		//
        components: {
			PageInfo,
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

    }
</style>
