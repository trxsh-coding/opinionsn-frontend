<template>
    <textarea v-model="value" rows="1" ref="textareaRef">

    </textarea>
</template>

<script>
    export default {
        name: "textareaReusable",
        data() {
            return {
                value: ''
            }
        },
        watch: {
            value() {
                this.calcHeight(this.$refs.textareaRef);
            }
        },
        methods: {
            calcHeight(el) {
                el.style.height = 'auto';
                let calculated = el.offsetHeight + el.scrollHeight - el.clientHeight;
                el.style.height = calculated + 'px';
            },
        }
    }
</script>

<style lang="scss">
    textarea {
        resize: none;
        height: auto;
        min-height: 10px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
