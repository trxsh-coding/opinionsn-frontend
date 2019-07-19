<template>
    <div class="checkbox-reusable" @click="change" >
        <icon-base
                v-if="!checked"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                icon-name="add"><icon-checkbox/>
        </icon-base>
        <icon-base
                v-if="checked"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                icon-name="add"><icon-checkbox-active/>
        </icon-base>
        <lang-string :title="description" />
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconCheckbox from "../icons/create/IconCheckbox";
    import IconCheckboxActive from "../icons/create/IconCheckboxActive";
    import langString from "../langString"
    export default {
        name: "checkboxReusable",
        components: {IconBase, IconCheckbox, IconCheckboxActive, langString},
        model: {
            event:'change',
        },
        props: {
            height:Number,
            width:Number,
            borRad:Number,
            description:String,
            boolean: {
                type: Boolean,
                default: function() {
                    return undefined;
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
                checked:false
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
        },
        methods: {
            change(){
                this.checked = !this.checked;
                this.$emit('checked', boolean)


            }
        }
    }
</script>

<style lang="scss">
    .checkbox-reusable {
    }
</style>
