<template>
    <div class="addBlock">
        <div class="icon-add-block">

        </div>
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconPlus from "../icons/create/IconPlus";

    export default {
        name: "addOptionBlock",
        components: {IconBase,IconPlus }
    }
</script>

<style lang="scss">
    .addBlock{
        .icon-add-block {
            height: 90px;
            width: 90px;
            background: #E8EAEB;
        }
    }
</style>
