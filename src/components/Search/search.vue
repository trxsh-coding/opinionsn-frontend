<template>
    <div class="search-wrapper">
        <div class="search-panel flex-align-center">
            <el-input class="br-12" :placeholder="lstr('search')" v-model="keywords" @change="searchUsers">

            </el-input>
            <span class="cancel" @click="clearForm" >
                <lang-string :title="'cancel'" />
            </span>
        </div>
        <div class="links-section" v-for="item in items">
            <users :item="item" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    import Users from "./Event/users";
    import {mapState} from 'vuex'
    export default {
        mixins:[langMixin],
        components:{Users, langString},
        name: "search",
        data(){

            return {

                keywords:'',
            }

        },
        computed: {

            ...mapState('searchUser', {
                state: s => s,
                items: s => s.items

            }),

        },
        methods: {

            searchUsers() {

                this.$store.dispatch('searchUser/list', {customUrl: `/api/rest/findAllContaining/${this.keywords}`})


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
