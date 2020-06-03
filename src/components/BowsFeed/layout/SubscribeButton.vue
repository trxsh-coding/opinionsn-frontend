<template>
    <div class="subscribe-block flex mr-14" :style="wrapperStyle">
        <span class=" pointer" :style="spanStyle" v-if="isLeader" @click="subscribeActions">{{translateKeyword('you_are_subscribed')}}</span>
        <span class=" pointer"  :style="spanStyle" v-else @click="subscribeActions">{{translateKeyword('follow')}}</span>

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
           },
           primaryStyle: {
               type:Boolean,
               default: true
           }
        },
        data() {
            return {
                isLeader: this.leader
            }
        },
        computed: {
            spanStyle(){
             const primaryStyle = {
                  color:!this.isLeader ? '#4B97B4' : '#8E8E93'
              }

              const secondaryStyle = {
                  color:this.isLeader ? '#4B97B4' : '#FFFFFF'
              }

              return this.primaryStyle ? primaryStyle : secondaryStyle

            },
            wrapperStyle(){

                const styles = {
                    borderWidth:'0.5px',
                    borderColor:'#4B97B4',
                    borderStyle:'solid',
                    backgroundColor: !this.isLeader ? '#4B97B4' : '#FFFFFF',
                    padding: '5px 10px 7px 11px'

            };


                if (!this.primaryStyle ) {
                    return styles
                }
                return  {}
            }

        },



        methods: {
            async subscribeActions() {
                let res;
                try {
                    if (!this.isLeader) {
                         res = await this.$store.dispatch(`userPage/followUser`, this.id);
                        this.isLeader = !this.isLeader

                    } else {
                        this.$store.dispatch(`userPage/unFollowUser`, this.id);
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
        border-radius: 4px;
        span {
            font-size: 11px;
        }
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
