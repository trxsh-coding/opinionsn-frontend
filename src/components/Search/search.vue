<template>
    <div class="search-wrapper">
        <div class="search-panel flex-align-center">
            <input-reusable
                    v-model="keywords"
                    class=" pl-14 mt-1"
                    input-placeholder="search"
                    @keyup.enter.native = "searchUsers"
            />
       </div>

        <div class="button-panel mt-10 ">
            <div class="search_type flex mr-10" >
                <span class="typeSpan pointer" @click="setTypeOfSearch('POLL')" :class="{typeButton : type === 'POLL'}">
                Опросы
            </span>
                <div class="upper-border "></div>
            </div>
            <span class="typeSpan pointer" @click="setTypeOfSearch('USER')" :class="{typeButton : type === 'USER'}">
                Люди
            </span>
        </div>
        <div class="links-section mt-10" v-show="keywords !== ''" v-for="item in items">
            <search-instance :item="item" :type="type"/>
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
    import InputReusable from "../reusableСomponents/InputReusable";
    import VoteInstance from "../voteFeed/voteInstance";
    import SearchInstance from "./searchInstance";
    export default {
        mixins:[langMixin],
        components:{
            SearchInstance,
            VoteInstance,
            InputReusable,
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



    }
    @media only screen
    and (min-width: 300px)
    and (max-width: 765px){
        .search-wrapper {
            margin-top: 48px !important;

            .button-panel {
                display: flex;
            }
        }
    }
</style>
