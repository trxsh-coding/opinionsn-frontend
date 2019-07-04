<template>
    <div class="desktop-header">
        <div class="nav-container container">
            <div class="search-block">
                <icon-base>
                </icon-base>
            </div>
            <div class="profile-annotation-block">

            </div>
        </div>
    </div>
</template>

<script>
    import IconBase from "../../icons/IconBase";
    export default {
        name: "desktop-header",
        components: {IconBase}
    }
</script>

<style lang="scss">
    .desktop-header {
        background: #FFFFFF;
        width: 100%;
        height: 60px;
    }
</style>
