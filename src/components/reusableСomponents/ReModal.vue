<template>
    <div class="modal-view flex-align-center " v-scroll-lock="true">
        <div class="modal-overlay " @click="closeModal"></div>
        <div class="flex-column overflow-hidden"   :style="modalStyle">
            <div class="modal-close-button pb-10">
                <Close @click.native="closeModal"/>
            </div>
            <div class="modal-container pt-10 relative"  :class="{'overflow-scroll' : overflow, 'height-100' : mobile}" @scroll="onScroll">
                <div class="content-blur-overlay">

                </div>
                <div class="modal-content " >
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Close from "../iconsV2/Close";
    export default {
        name: "ReModal",
        components: {Close},
        props: {
            width: Number || String,
            height: Number || String,
            br: Number || String,
            overflow:Boolean

        },
        watch: {

        },
        computed: {
            mobile() {
                return this.$root.mobile;
            },
            scrolled_to_bottom() {
                return this.$root.scrolled_to_bottom;
            },
            modalStyle(){
                const {width, height, br} = this;

                return {
                    borderRadius:this.calculateType(br),
                    width: this.calculateType(width),
                    height: this.calculateType(height)
                }
            }
        },
        methods: {
            onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
                if (scrollTop + clientHeight + 400 >= scrollHeight) {
                    this.$emit('onScrolledBottom')
                }
            },
            calculateType(value){
                return typeof value !== 'string' ? value + 'px' : value
            },
            closeModal(){
                this.$emit('onCloseModal')
            }
        }
    }
</script>

<style lang="scss">
    .modal-view {
        justify-content: center;
        position: fixed;
        top:0;
        left: 0;
        z-index: 999999;
        width: 100%;
        height: 100%;

        .modal-overlay {
            z-index: 100;
            opacity: 0.4;
            width: 100%;
            height: 100%;
            position: fixed;
            top:0;
            left: 0;
            background: #000000;
        }
        .modal-close-button {
            z-index: 100;
            background-color: #FFFFFF;
            border-bottom: 0.5px solid #8A9499;
            display: flex;
            justify-content: flex-end;
            padding: 10px 14px;
        }
        .content-blur-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
        }
        .modal-container {
            border-radius: 0 0 10px 10px;
            background-color: #FFFFFF;
            z-index: 1000;
        }

        @media only screen and (min-width: 300px) and (max-width: 765px) {
            .modal-container {
                border-radius: 0 !important;
            }
        }
    }
</style>
