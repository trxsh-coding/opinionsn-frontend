<template>
    <div class="subscribe-block flex mr-14">
        <span class="inactive pointer" v-if="isLeader" @click="subscribeActions">{{translateKeyword('you_are_subscribed')}}</span>
        <span class="active pointer" v-else @click="subscribeActions">{{translateKeyword('follow')}}</span>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";

    export default {
        name: "SubscribeButton",
        mixins:[translateKeywordMixin],
        props: {
           leader: {
             type:Boolean,
             default:false,
             required: true
           },
           id: {
               type:Number,
               required:true
           }
        },
        data() {
            return {
                isLeader: this.leader
            }
        },
        computed: {

        },
        methods: {
            async subscribeActions() {
                let res;
                try {
                    if (!this.isLeader) {
                         res = await this.$store.dispatch(`userPage/followUser`, this.id);
                    }
                    if(res.status === 200){
                        this.isLeader = !this.isLeader
                    }
                }catch (e) {
                    console.trace(e)
                }


            },
        }
    }
</script>

<style lang="scss">
    .subscribe-block {
        z-index: 100;
        .active {
            font-size: 11px;
            color:#4B97B4;
        }
        .inactive {
            color: #8E8E93;
            font-size: 11px;
        }
    }
</style>
