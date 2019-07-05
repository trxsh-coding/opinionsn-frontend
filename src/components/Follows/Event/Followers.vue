<template>
	<event :isFollowing="isFollowing" :id="id"/>
</template>

<script>
    import event from './event'
    export default {
        name: "Followings",
        props:['item', 'id', 'isFollowing'],
        data(){
            return{

            }
        },
        computed: {



        },

        methods: {



        },
        components:{event},

    }
</script>

<style lang="scss">

    .followings-wrapper {
        display: flex;
        justify-content: space-between;
        border-bottom-color: #B9C0C4 ;
        border-bottom-width: 0.5px;
        border-bottom-style: solid;
    }
    .followings-wrapper:last-child {

        border:none;

    }

</style>
