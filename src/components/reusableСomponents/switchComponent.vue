<template>
    <div class="switch-block flex" :style="wrapperPosition">
        <div class="switch-button mr-6" :style="wrapperStyle" @click="change">
                <div class="switch-circle" :style="circleStyle">
                </div>
        </div>
            <slot name="description">
                <transition name="slide-fade">
                    <span class="description" v-if="boolean">{{activeDescription}}</span>
                </transition>
                <transition name="slide-fade">
                    <span class="description" v-if="!boolean">{{inactiveDescription}}</span>
                </transition>
            </slot>
    </div>
</template>

<script>
    export default {
        name: "switchComponent",
        props: {
            width: {
                type:Number,
            },
            height: {
              type:Number
            },
            borRad: {
              type:Number
            },
            color: {
                type:String
            },
            activeColor: {
                type: String
            },
            boolean: {
                type: Boolean
            },
            activeDescription: {
                type: String
            },
            inactiveDescription: {
                type: String
            },
            textLayout: {
                validator: function (value) {
                    return ['top', 'right', 'left', 'bottom'].indexOf(value) !== -1
                }
            },

        },
        computed: {

            wrapperPosition(){

                let { textLayout } = this;

                switch (textLayout) {
                    case 'top':
                        return {
                            flexDirection: 'column-reverse',
                        };
                    case 'bottom':
                        return {
                            flexDirection: 'column',
                        };
                    case 'left':
                        return {
                            flexDirection: 'row-reverse',
                        };
                    case 'right':
                        return {
                            flexDirection: 'row',
                        };
                    default:
                        return '';
                }

            },
            wrapperStyle() {
                let {borRad, height, width, color, activeColor, boolean} = this;

                return {
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${borRad}px`,
                    backgroundColor: boolean ? `${activeColor}` :  `${color}`,

                };
            },

            circleStyle(){
                let {borRad, height, width, color, boolean } = this;
                let position = boolean ?{transform: 'translate(55%)'}   : {transform: 'translate(0)'};

                return {
                    width: `${width/2}px`,
                    height: `${height - 4}px`,
                    borderRadius: `50%`,
                    backgroundColor: `#ffffff`,
                    ...position

                };
            }
        },
        methods: {
            change(){
                this.boolean = !this.boolean
                this.$emit('change', this.boolean)
            }
        }
    }
</script>

<style lang="scss">
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
     {
        opacity: 0;
    }
    .switch-block {
        align-items: center;
        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            color: #152D3A;
            transition: 300ms;

        }

        .switch-button {
            display: flex;
            align-items: center;
            padding: 4px;
            transition: 300ms;

            .switch-circle {
                border: 4px solid #1A1E22;
                transition: 300ms;
            }
        }

    }
</style>
