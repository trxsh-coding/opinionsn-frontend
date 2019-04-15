<template>
    <div class="blockchain-animation">
        <icon-base

                width="100"
                height="100"
                viewBox="0 0 251 250"
                icon-name="icon-animate1">
            <icon-animate1/>
        </icon-base>

        <icon-base

                width="100"
                height="100"
                viewBox="0 0 251 250"
                icon-name="icon-animate1">
            <icon-animate1/>
        </icon-base>

        <icon-base

                width="100"
                height="100"
                viewBox="0 0 251 250"
                icon-name="icon-animate1">
            <icon-animate1/>
        </icon-base>
    </div>
</template>

<script>
    import IconBase from '../../../icons/IconBase'
    import IconAnimate1 from '../../../icons/animate/IconAnimate1'

    export default {
        name: "blockChainAnimation",
        components:{IconBase, IconAnimate1},

    }
</script>

<style lang="scss">

    @keyframes moveY {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(100%);
        }
    }

    .blockchain-animation {
        display: none;

        width: 100%;
        height: 100%;
        position: absolute;


        svg {
            position: absolute;
            &:nth-child(1) {
                top: 20px;
                left: 30px;
            }
            &:nth-child(2) {
                top: 50px;
                right: 50px;
            }
            &:nth-child(3) {
                top: 120px;
                left: 150px;
            }
        }

    }



</style>
