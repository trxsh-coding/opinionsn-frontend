<template>

    <div class="avatar-wrapper ">

        <svg width="10" height="44" viewBox="0 0 10 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.25868 43C3.71201 37.2183 1 29.9259 1 22C1 14.0741 3.71201 6.78168 8.25868 1" stroke="#4B97B4" stroke-width="1.5" stroke-linecap="round"/>
        </svg>


        <div class="avatar" :style="{ 'background-image': 'url('+ publicPath + user.path_to_avatar + ')' }">

        </div>

    </div>

</template>

<script>
    import IconBase from '../../../icons/IconBase'
    import IconBorder from '../../../icons/IconBorder'

    export default {
        props:['user'],
        name: "borderedAvatar",
        data(){

            return {

                publicPath: process.env.VUE_APP_MAIN_API


            }

        },
        components: {IconBase, IconBorder}
    }
</script>

<style lang="scss">

    .avatar-wrapper {


        svg {

            position: absolute;
            top: 8px;
            left: -5px;

        }

        .avatar {

            width: 60px;
            height: 60px;
            border-radius: 1000px;
            background-repeat: no-repeat;
            background-size: cover;

        }

    }

</style>
