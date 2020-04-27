<template>
    <div>
        <div class="mobile-header " :class="{'hideBar': hidden}" >
            <primary v-if=" headerType==='primary' ">
                <slot></slot>
            </primary>
        </div>
    </div>
</template>

<script>
    import Primary from "./types/primary";
    export default {
        name: "MobileHeader",
        components: {Primary},
        props: {
            headerType:String
        },
        data() {
            return {
                hidden: false
            }
        },
        watch: {
            scroll_top(val, oldVal) {
                if (oldVal > 200) {
                    if (val > oldVal) this.hidden = true;
                    if (val < oldVal) this.hidden = false;
                } else {
                    this.hidden = false;
                }
            },
        },
        computed: {
            scroll_top() {
                return this.$root.scroll_top
            },
        }
    }
</script>

<style lang="scss">
    .hideBar {
        transform: translateY(-100%);
    }
    .mobile-header {
        transition: opacity .5s;


    }
</style>
