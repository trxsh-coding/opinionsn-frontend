<template>
    <div class="notification-block" :class="{'notification-unchecked' : !isRead}">
        <notification-event-caption :eventType="event" :author="author"/>
        <notification-content :initiator="initiator" :date="author.date"/>
    </div>
</template>

<script>
    import NotificationEventCaption from "./EventCaption";
    import NotificationContent from "./Content";
    export default {
        name: "notificationAnnotation",
        components: {NotificationContent, NotificationEventCaption},
        props:['data'],
        computed: {
            event(){
                return this.data.eventType
            },
            isRead(){
                return this.data.read;
            },
            author(){
                return this.data.author
            },
            initiator(){
                return this.data.initiator
            }
        }
    }
</script>

<style lang="scss">
    .notification-block {
        padding: 13px 16px;
        border-bottom: 0.5px solid #C7C7CC;
        &:last-of-type {
            border-bottom: none;
        }
    };
    .notification-unchecked {
        background-color: #E4F1F3;
    }
</style>
