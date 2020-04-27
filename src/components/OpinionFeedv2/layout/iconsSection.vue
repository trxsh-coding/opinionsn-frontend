<template>
    <div class="icons-block mt-8 flex-align-center">
        <div class="icon-block timestamp-block mr-12 flex-align-center" v-show="EndDate">
            <icon-base width="18" height="18" view-box="0 0 18 18" icon-color="white">
                <Time class="icons-color" />
            </icon-base>
            <time-trans :time="EndDate" predictionTime class="flex-align-center"/>
        </div>
        <div class="icon-block total-votes-block mr-12 flex-align-center">
            <icon-base width="20" height="20" view-box="0 0 20 20" icon-color="white">
                <Amount class="icons-color" />
            </icon-base>
            <span>{{Votes}}</span>
        </div>
        <div class="icon-block total-comments-block mr-12 flex-align-center">
            <icon-base width="22" height="22" view-box="0 0 22 22" icon-color="white">
                <Comments class="icons-color" />
            </icon-base>
            <span>{{Comments}}</span>
        </div>
    </div>
</template>

<script>
    import IconBase from "../../icons/IconBase";
    import Comments from "../../iconsV2/Comments";
    import Amount from "../../iconsV2/Amount";
    import Time from "../../iconsV2/Time";
    import TimeTrans from "../../timeTrans";

    export default {
        name: "iconsSection",
        props: {
          EndDate:String,
          Votes:Number,
          Comments:Number
        },
        components: {TimeTrans, Time, Amount, Comments, IconBase},
        computed: {
            mobile() {
                return this.$root.mobile;
            },
        }
    }
</script>

<style lang="scss">
    .icons-block span {
        font-size: 11px;
        padding-left: 5px;
        color: #8E8E93;
        .icon-block {

        }
    }
    @media only screen and (max-width: 400px) {
        .icons-block span {
            font-size: 9px;
        }
    }
</style>
