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
        model: {
            event: 'change',
        },
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
                type: Boolean,
                default: function() {
                    return undefined;
                }
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
        data() {
            return {
                is_active: false
            }
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
                let {borRad, height, width, color, activeColor, is_active, boolean} = this;

                boolean = (boolean !== undefined) ? boolean : is_active;

                return {
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${borRad}px`,
                    backgroundColor: `${color}`,

                };
            },

            circleStyle(){
                let {borRad, height, width, color, boolean, is_active } = this;
                boolean = (boolean !== undefined) ? boolean : is_active;

                let position = boolean ? {transform: 'translate(90%)'}   : {transform: 'translate(0)'};

                return {
                    width: `${width/3}px`,
                    height: `${height-5}px`,
                    borderRadius: `50%`,
                    backgroundColor: `#1A1E22`,
                    ...position

                };
            },

        },
        methods: {
            change(){
                // this.boolean = !this.boolean
                let { boolean } = this;

                this.is_active = !this.is_active;
                boolean = (boolean !== undefined) ? boolean : this.is_active;

                this.$emit('select', boolean)
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
            border-width: 1.5px;
            border-style: solid;
            display: flex;
            align-items: center;
            padding: 2px;
            transition: 300ms;

            .switch-circle {
                transition: 300ms;
            }
        }

    }
</style>
