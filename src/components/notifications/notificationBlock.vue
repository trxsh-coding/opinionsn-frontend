<template>
    <div class="notification-block">
        <h1> Сап </h1>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "notificationBlock",
        props:['userId'],
        computed: {

            author:function () {



            }


        }
    }
</script>

<style lang="scss">

    .notification-block {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000000;

    }

</style>
