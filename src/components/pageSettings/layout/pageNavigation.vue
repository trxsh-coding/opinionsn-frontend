<template>
    <div class="navigation flex-between flex-align-center">
        <lang-string
                @click.native="clearData"
                class="cancel-btn pointer"
                :title="'cancel'" />
        <lang-string
                class="title"
                :title="'edit_profile'" />
        <lang-string
                @click.native="sendData"
                class="submit-btn pointer"
                :title="'done'" />
    </div>
</template>

<script>
    import langString from "../../langString";

    export default {
        name: "pageNavigation",
        components: {
            langString
        },
        methods: {
            clearData() {
                console.log("===clearData===");
            },
            sendData() {
                console.log("===sendData===");
            }
        },
    }
</script>

<style lang="scss">

    .navigation {

        .cancel-btn {
            font-weight: normal;
            font-size: 13px;
            color: #BCBEC3;
        }

        .title {
            font-weight: bold;
            font-size: 17px;
            color: #4B97B4;
        }

        .submit-btn {
            font-weight: normal;
            font-size: 13px;
            color: #1A1E22;
        }

    }

</style>