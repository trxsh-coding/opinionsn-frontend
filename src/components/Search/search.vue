<template>
    <div class="search-wrapper">
        <div class="search-panel flex-align-center">
            <el-input class="br-12" :placeholder="lstr('search')" v-model="keywords" @change="searchUsers" @keyup.enter.native="searchUsers">

            </el-input>
            <span class="cancel" @click="clearForm" >
                <lang-string :title="'cancel'" />
            </span>
        </div>
        <div class="button-panel mt-10 ">
            <span class="pointer typeSpan" @click="setTypeOfSearch('POLL')" :class="{typeButton : type === 'POLL'}">
                Опросы
            </span>
            <span class="pointer typeSpan" @click="setTypeOfSearch('USER')" :class="{typeButton : type === 'USER'}">
                Люди
            </span>
        </div>
        <div class="links-section mt-10" v-for="item in items">
            <users :item="item" v-if="type === 'USER'"/>
            <polls :item="item" :polls="polls"  v-if="type === 'POLL'"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    import Users from "./Event/users";
    import Polls from "./Event/polls"
    import {mapState} from 'vuex'
    import {globalStoreMixin} from '../../store/modules/globalStore'
    export default {
        mixins:[langMixin, globalStoreMixin()],
        components:{Users, langString, Polls},
        name: "search",
        data(){

            return {

                keywords:'',
                type:'USER',
                contain:null
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

                this.type = payload

            },
            searchUsers() {

                let type = this.type
                let contain = this.keywords

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
            margin-right: 16px;
        }
        .typeButton {

                border-radius: 15px;
                background: #919BA0;
                padding: 2px 9px;
                font-family: Roboto;
                font-style: normal;
                font-weight: 300;
                font-size: 12px;
                line-height: 14px;
                color: #FFFFFF;
                margin-right: 16px;


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
