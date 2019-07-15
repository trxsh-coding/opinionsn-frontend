<template>
    <div class="checkbox-reusable" :style="checkboxStyle">
        <icon-base
                fill="none"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                icon-name="add"><icon-checkbox/>
        </icon-base>
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconCheckbox from "../icons/create/IconCheckbox";

    export default {
        name: "checkboxReusable",
        components: {IconBase, IconCheckbox},
        props: {
            height:Number,
            width:Number,
            borRad:Number,
        },
        computed: {
            checkboxStyle(){
                let {width, height, borRad} = this;
                width = `${width}px`;
                height= `${height}px`;
               let borderRadius = `${borRad}px`;
                return {
                    width, height, borderRadius
                }
            }
        }
    }
</script>

<style lang="scss">
    .checkbox-reusable {
        border: 2px solid #1A1E22;
    }
</style>
