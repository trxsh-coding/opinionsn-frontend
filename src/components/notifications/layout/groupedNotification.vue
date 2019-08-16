<template>
    <div class="grouped-notification" >
        <div class="notification-body"
        v-for="notification in items">
            <notification-instance :notification="notification"/>
        </div>
    </div>
</template>

<script>
    import NotificationInstance from "./notificationInstance";
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    export default {
        name: "groupedNotification",
        components: {PictureReusable, NotificationInstance},
        props: {
            items: Array
        },
        computed: {

        }
    }
</script>

<style lang="scss">

</style>