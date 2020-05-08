<template>
    <div class="option-border pointer" @click="action">
        <div class="option-block relative" :class="{'blur' : blur}" >
            <div class="content-block relative flex-between"  >
                <div class="description-block">
                    <span v-if="voted" :class="{'font-13' : mobile, 'font-14' : !mobile}">{{description}}</span>
                    <span v-else :class="{'font-13' : mobile, 'font-14' : !mobile}"> Какой-то текст чтобы затемнить его </span>
                </div>
                <div class="percentage-block" v-if="voted">
                    <span :class="{'font-13' : mobile, 'font-14' : !mobile}">{{percentages}}%</span>
                </div>
            </div>
            <div class="percentage-overlay" :style="percentageOverlayStyles"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReOption",
        props: {
            description:String,
            percentages:Number,
            voted:Boolean,
            blur:Boolean

        },
        computed: {
            mobile() {
                return this.$root.mobile;
            },

            percentageOverlayStyles(){
                return {
                    width:!this.voted ? '100%' : this.percentages + '%',
                    height:'100%',
                }
            }
        },
        methods: {
            action(){
                this.$emit('onAction')
            }
        }
    }
</script>

<style lang="scss">
    .option-border {
        border: 1px solid #D2D2D2;
        border-radius: 4px;
        z-index: 100;
        .blur {
            filter: blur(3px);
            -webkit-filter: blur(3px);
        }
    }
    .option-block {
        padding: 9px 11px 10px 11px;
        background: #E4F1F3;
        border-radius: 4px;
        .content-block {
            z-index: 10;
        }

        .percentage-overlay {
            background-color: #9CE2EA;
            position: absolute;
            z-index: 0;
            top:0;
            left:0;
        }
    }

</style>
