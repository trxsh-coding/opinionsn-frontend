<template>
    <div class="reusable-input flex-align-center">
        <input type="text" :value="value" v-if="inputType === 'input'"
               @input="$emit('input', $event.target.value)"
               :placeholder="placeholder"
        >
        <textarea v-else rows="1" ref="textarea"
                  :placeholder="placeholder"
                  :value="value" @input="$emit('input', $event.target.value)"  />
        <slot/>
    </div>
</template>

<script>
    import Send from "../iconsV2/Send";
    export default {
        name: "ReusableExplainInput",
        components: {Send},
        props: {
            value:String,
            placeholder:{
                type:String,
                default:'',
            },
            inputType:{
                type: String,
                default: 'input'
            }
        },
        watch: {
            value() {
                if (this.inputType === 'textarea') {
                    function calcHeight(el) {
                        el.style.height = 'auto';
                        let calculated = el.offsetHeight + el.scrollHeight - el.clientHeight;
                        el.style.height = calculated + 'px';
                    }
                    calcHeight(this.$refs.textarea);
                }
            }
        },
    }
</script>

<style lang="scss">
    .reusable-input {
        flex:1;
        input, textarea   {
            border-radius: 18px;
            padding: 8px 8px 8px 11px;
            border: 0.5px solid #D2D2D2;
            width: 100%;
            font-size: 13px;
            &:focus {
                outline: none !important;

            }
            ::placeholder {
                font-size: 13px;
                color: #8E8E93;
            }
        }
        textarea {
            resize: none;
        }
    }
</style>
