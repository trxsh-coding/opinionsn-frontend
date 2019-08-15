<template>
    <div class="add-reusable ">
        <div class="icon-add-block v-center" :class="[!withPhoto ? 'h-60' : 'h-90', withPhoto ? 'w-90' : 'w-60']">
            <icon-base
                    class="pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    icon-name="upload"><icon-plus/>
            </icon-base>
        </div>
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconPlus from "../icons/create/IconPlus";
    import langString from "../langString"
    export default {
        name: "addReusable",
        props: ['withPhoto'],
        components: {IconBase,IconPlus, langString},

    }
</script>

<style lang="scss">
    .add-reusable{
        border-radius:6px;
        min-height: 60px;
        .icon-add-block {
            border-radius: 6px;
            height: 90px;
            width: 90px;
            background: #E8EAEB;

        }
        .add-option {

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            padding-left: 14px;
            color: rgba(173, 174, 175, 0.7);


        }
    }
</style>
