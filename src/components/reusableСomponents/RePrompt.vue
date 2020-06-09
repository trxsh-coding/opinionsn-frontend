<template>
        <div class="prompt-wrapper relative" v-if="visible">

            <div class="prompt-window">
                <div class="title-block">
                    <span >{{title}}</span>
                </div>
                <div class="prompt-subject-block">
                    <slot></slot>
                </div>
                <div class="prompt-button-block">
                    <span class="pr-20 pointer font-13" @click="handlePromptAction(true)">{{translateKeyword('send')}}</span>
                    <span class="pointer font-13" @click="handlePromptAction(false)">{{translateKeyword('cancel')}}</span>
                </div>
            </div>
            <div class="overlay">

            </div>

        </div>
</template>

<script>
    import translateKeywordMixin from "../mixins/translateKeywordMixin";

    export default {
        name: "RePrompt",
        mixins:[translateKeywordMixin],
        props: {
            visible:Boolean,
            title:{
                type:String,
                required:true
            },
        },
        methods: {
            handlePromptAction(bool){
                this.visible = false;
                this.$emit('onConfirm', bool)
            }
        }
    }
</script>

<style lang="scss">
    .prompt-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .prompt-window {
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            padding: 20px;
            z-index: 2;
            width: 400px;
            height: 200px;
            background: #ffffff;
            justify-content: space-between;
        }
        .prompt-button-block {
            align-self: flex-end;
        }
        .overlay {
            overflow: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.2;
            background-color: #000000;
            top:0;
            left: 0;
            z-index: 1 !important;
        }
    }
</style>
