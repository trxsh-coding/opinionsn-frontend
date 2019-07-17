<template>
    <div class="checkbox-reusable" @click="checkboxAction">
        <icon-base
                v-if="value"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                icon-name="add"><icon-checkbox/>
        </icon-base>
        <icon-base
                v-if="!value"
                fill="none"
                width="20"
                height="20"
                viewBox="-2 -2 14 14"
                icon-name="add"><icon-checkbox-active/>
        </icon-base>
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconCheckbox from "../icons/create/IconCheckbox";
    import IconCheckboxActive from "../icons/create/IconCheckboxActive";

    export default {
        name: "checkboxReusable",
        components: {IconBase, IconCheckbox, IconCheckboxActive},
        props: {
            height:Number,
            width:Number,
            borRad:Number,
        },
        data() {
            return {
                value:false
            }
        },
        computed: {
            // checkboxStyle(){
            //     let {width, height, borRad} = this;
            //     width = `${width}px`;
            //     height= `${height}px`;
            //    let borderRadius = `${borRad}px`;
            //     return {
            //         width, height, borderRadius
            //     }
            // }
        },
        methods: {
            checkboxAction(){
                this.value = !this.value
            }
        }
    }
</script>

<style lang="scss">
    .checkbox-reusable {
    }
</style>
