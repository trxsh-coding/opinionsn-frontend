<template>
    <div class="switch-block flex-align-center mt-12" :style="wrapperPosition">
        <div class="switch-button mr-6" :style="wrapperStyle" @click="change"  v-if="type === 'button'">
                <div class="switch-circle" :style="circleStyle">
                </div>
        </div>
        <div  class="checkbox-button mr-10" @click="change" v-if="type === 'checkbox'" >
            <icon-base
                    v-if="!isActive"
                    fill="none"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    icon-name="add"><icon-checkbox/>
            </icon-base>
            <icon-base
                    v-if="isActive"
                    fill="none"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    icon-name="add"><icon-checkbox-active/>
            </icon-base>
        </div>

            <slot name="description">
                    <span class="description" v-if="isActive">{{activeDescription}}</span>
                    <span class="description" v-if="!isActive">{{inactiveDescription}}</span>
            </slot>
        <div class="arrow-button"
             @click="change"
             v-if="type === 'arrow'"
             :class="{ arrowTranslate : !isActive}">
            <icon-base
                    class="ml-10"
                    fill="none"
                    width="10"
                    height="6"
                    viewBox="0 3 10 6"
                    icon-name="add"><icon-arrow/>
            </icon-base>
        </div>
    </div>
</template>

<script>
    import IconBase from '../icons/IconBase'
    import IconCheckboxActive from '../icons/create/IconCheckboxActive'
    import IconCheckbox from '../icons/create/IconCheckbox'
    import IconArrow from '../icons/create/IconArrow'

    export default {
        name: "switchComponent",
        components: {IconBase, IconCheckbox, IconCheckboxActive, IconArrow},
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
            condition: {
                type: Number
            },
            activeDescription: {
                type: String
            },
            inactiveDescription: {
                type: String
            },
            type: {
              type: String,
                default: function() {
                    return 'button';
                }
            },
            textLayout: {
                validator: function (value) {
                    return ['top', 'right', 'left', 'bottom'].indexOf(value) !== -1
                }
            },

        },
        data() {
            return {
                isActive: false,
                condition:null,
                trigger:true,
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
                let {borRad, height, width, color, activeColor, isActive, boolean} = this;

                boolean = (boolean !== undefined) ? boolean : isActive;

                return {
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${borRad}px`,
                    backgroundColor: `${color}`,

                };
            },

            circleStyle(){
                let {borRad, height, width, color, boolean, isActive } = this;
                boolean = (boolean !== undefined) ? boolean : isActive;

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

                this.isActive = !this.isActive;
                boolean = (boolean !== undefined) ? boolean : this.isActive;

                this.$emit('select', boolean)
            },

        }
    }
</script>

<style lang="scss">
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
        .arrowTranslate {
            transform: rotateX(180deg);
            align-items: flex-start;
            display: flex;
        }



</style>
