<template>
    <div class="circle-progress relative" :style="wrapperStyle">
        <div class="overlay">

        </div>
        <div class="hide" :style="hideStyle">

        </div>
        <div class="active-1">

        </div>
        <div class="active-2">

        </div>
    </div>
</template>

<script>
    export default {
        name: "circleProgressBar",
        props: {
            percentage: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
            },
            width: {
                type: Number
            },
            color: {
                type: String
            }
        },
        computed: {
            wrapperStyle() {
                let {width,  height, size, color} = this;
                return {
                    width: `${width || size}`,
                    height: `${height || size}`,
                    backgroundColor: color
                }
            },
            hideStyle() {
                let {percentage} = this;
                let deg = (360*100) * percentage;
                return {
                    transform: `rotate(${deg}deg)`
                }
            }
        }
    }
</script>

<style lang="scss">
    .circle-progress {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        z-index: 1;
        overflow: hidden;
        &:after {
            content:'';
            background: black;
            z-index: 1000000;
        }
        .overlay {
            text-align: center;
            width: 90%;
            height: 90%;
            position: absolute;
            border-radius: 50%;
            left: 5%;
            top: 5%;
            z-index: 1000;
            //box-shadow: inset 0px 0px 20px rgba(#000, 0.5);
            box-sizing: border-box;
        }
        .hide {
            height: 100%;
            width: 50%;
            position: absolute;
            left: 50%;
            top: 0;
            z-index: 200;
            transform-origin: left center;
        }
        .active-1, .active-2 {
            width: 50%;
            height: 100%;
            border-radius: 50%;
            background: #4B97B4;
            position: absolute;
            top:0;
            left:50%;
            transform-origin: left center;
        }

    }

</style>

