<template>
   <div class="followings">

       <event :isFollowing="isFollowing" :id="id"/>
   </div>
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

        mounted() {

            console.log(this.isFollowing)


        }


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
