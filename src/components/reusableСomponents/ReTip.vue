<template>
    <div class="tip-block flex">
        <Tip @click.native="onPress" v-if="!active"/>
        <div class="active-tip relative flex-align-center" :style="positionStyle" v-else @click="onClose">
            <div class="triangle"></div>
            <span>{{translateKeyword('tip_header')}}</span>
        </div>

    </div>
</template>

<script>
    import translateKeywordMixin from "../mixins/translateKeywordMixin";
    import Tip from "../iconsV2/Tip";

    export default {
        name: "ReTip",
        components: {Tip},
        mixins:[translateKeywordMixin],
        props: {
            active:Boolean,
            top:Number,
            left:Number
        },
        computed: {
            positionStyle(){
                const {top, left} = this;
                return {
                    position:'absolute',
                    top:top + 'px',
                    left:left + 'px'
                }
            }
        },
        methods: {
            onPress(){
                this.$emit('action')
            },
            onClose(){
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss">
    .tip-block {
        display: inline-block;
        .triangle {
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 11px solid #4b97b4;
            position: absolute;
            top:-20%;
            left:47%;
        }
        .active-tip {
            background-color: #4B97B4;
            width: 254px;
            z-index: 10000000;
            border-radius: 5px;
            height: 49px;
            padding-left: 10px;
            span {
                line-height: 18px;
                font-size: 13px;
                color:#ffffff
            }
        }
        .tip-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000000;
        }
    }
</style>
