<template>
    <div class="search-wrapper">
        <div class="search-panel flex-align-center">
            <el-input
				class="br-12"
				:placeholder="lstr('search')"
				v-model="keywords"
				@keyup.enter.native="searchUsers">
				<template slot="append">
					<i @click="clearForm" class="pointer">
						<icon-base
							class="icon-close"
							fill="none"
							width="20"
							height="20"
							viewBox="0 0 10 20"
							icon-name="close"><icon-close />
						</icon-base>
					</i>
				</template>
            </el-input>
        </div>
        <div class="button-panel mt-10 ">
            <span class="typeSpan pointer" @click="setTypeOfSearch('POLL')" :class="{typeButton : type === 'POLL'}">
                Опросы
            </span>
            <span class="typeSpan pointer" @click="setTypeOfSearch('USER')" :class="{typeButton : type === 'USER'}">
                Люди
            </span>
        </div>
        <div class="links-section mt-10" v-show="keywords !== ''" v-for="item in items">
            <users :item="item" v-if="type === 'USER'"/>
            <polls :item="item" :polls="polls"  v-if="type === 'POLL'"/>
        </div>
    </div>
</template>

<script>
	import IconBase from '../icons/IconBase';
	import IconClose from "../icons/IconZoomIn";
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    import Users from "./Event/users";
    import Polls from "./Event/polls"
    import {mapState} from 'vuex'
    import {globalStoreMixin} from '../../store/modules/globalStore'
    export default {
        mixins:[langMixin, globalStoreMixin()],
        components:{
        	Users,
			langString,
			Polls,
			IconBase,
			IconClose
		},
        name: "search",
        data(){

            return {

                keywords:'',
                type:'USER',
                contain:null
            }

        },
		watch: {
			keywords() {
				this.searchUsers();
			}
		},
        computed: {

            ...mapState('searchUser', {
                state: s => s,
                items: s => s.items

            }),


            user_ids:function () {

                return this.items.map(item => {
                    return item.id
                });


            },

            author:function(){



            },

            poll_ids:function () {

                return this.items.map(item => {
                    return item.id
                });

            },

        },
        methods: {
            setTypeOfSearch(payload){

                this.type = payload;
				this.searchUsers();

            },
            searchUsers() {

                let type = this.type;
                let contain = this.keywords;

                if(this.type === 'POLL') {

                    this.$store.dispatch('searchUser/list', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/search/`, params: {type, contain}})


                } else {

                    this.$store.dispatch('searchUser/list', {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/findAllContaining/${this.keywords}`})


                }


            },

            clearForm() {

                this.keywords = '';

            }

        }
    }
</script>

<style lang="scss">
    .search-wrapper {

		.search-panel {
			padding: 0 8px;

			input {
				width: 100%;
				background: #FFFFFF;
				border: 1px solid #C4CCD0;
				border-radius: 24px 0 0 24px !important;
				padding-right: 42px;
				border-right: none;
			}

			.el-input-group__append {
				border-radius: 0 24px 24px 0;
				border: 1px solid #C4CCD0;
				border-left: none;
				background-color: #FFFFFF;
			}

			.icon-close {
				transform: rotate(45deg);
			}
		}

		.button-panel {
			display: flex;
			padding: 0 8px;
		}

        .el-input__inner {

            border-radius: 12px;
            margin-right: 9px;

        }
        .typeSpan {
            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            color: #3A4F5A;
            margin-right: 7px;
			padding: 2px 9px;
			border-radius: 15px;
        }
        .typeButton {
                background: #919BA0;
                color: #FFFFFF;
        }

        .cancel {

            padding-left: 9px;
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 13px;
            letter-spacing: -0.1px;
            color: #69777F;
            text-transform: uppercase;

        }

    }
</style>
