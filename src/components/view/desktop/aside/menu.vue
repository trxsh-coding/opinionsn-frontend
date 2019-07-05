<template>
    <div class="navigation-aside-menu">
        <div class="create-poll-block">
            <icon-base
                    fill="none"
                    width="23"
                    height="23"
                    viewBox="3 0 23 23"
                    icon-name="add"><icon-add-poll/>
            </icon-base>
        </div>

    </div>
</template>

<script>
    import IconBase from "../../../icons/IconBase";
    import iconAddPoll from "../../../icons/navigation/iconAddPoll";

    export default {
        name: "menu",
        components: {iconAddPoll, IconBase}
    }
</script>

<style lang="scss">
    .create-poll-block {
        padding: 7.5px 10.5px;
        background: #4B97B4;
    }
</style>
