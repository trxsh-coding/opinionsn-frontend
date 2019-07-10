<template>
    <div class="input-block">
        <lang-string
                class="input-placeholder"
                :title="inputPlaceholder"
        />
        <input type="text"
               v-model="value"
               :style="inputStyle"
               @change="inputValue(arguments[0].target.value)"
               @focus="focusInput(true)"
               @blur="inputValidation(false)"
               :class="{ focusedInput : active, validationStyle : validationError}"
        >
    </div>
</template>

<script>
    import langMixin from "../mixins/langMixin";
    import langString from "../langString";

    export default {
        name: "inputReusable",
        mixins:[langMixin],
        components:{langString},
        model: {
            event: 'change',
            validationError:false,
        },
        props: {
            width: {
                type:[Number, String],
                default: function () {
                    return '100%';
                }
            },
            height: {
                type:[Number, String],
                default: function () {
                    return 'auto';
                }
            },
            inputPlaceholder: {
                type:String,
                default: function () {
                    return 'Input'
                }
            },


        },
        data() {
            return {
                value: '',
                active:false
            }
        },

        computed: {
            placeholderTranslate(){

                return this.lstr('Input')

            },
            inputStyle(){
                let {width, height, handlePercentValue} = this;
                width = handlePercentValue(width);
                height = handlePercentValue(height);
                return {
                    width: `${width}`,
                    height: `${height}`,

                };
            }
        },
        methods: {
            focusInput(payload){
                this.active = payload;

            },
            inputValue(payload){
                this.$emit('change', payload);

            },
            inputValidation(payload){

                this.active = payload;
                if(this.value.length === 0){
                    this.validationError = true
                }

            },
            handlePercentValue(value) {

                if (value === undefined) return false;

                return `${value}`.slice(-1) === '%' ? value : value + 'px';

            },
        }
    }
</script>

<style lang="scss">
    .input-block {
        .focusedInput {
            border-bottom-color: #4B97B4 !important;
        }
        .validationStyle {
            border-bottom-color: red !important;

        }
        .input-placeholder {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: #747474;


        }
        input {
            outline: none;
            border-bottom-style: solid;
            border-bottom-color: #BCBEC3;
            border-bottom-width: 0.5px;
            border-top: none;
            border-right: none;
            border-left: 0;
        }
    }
</style>
