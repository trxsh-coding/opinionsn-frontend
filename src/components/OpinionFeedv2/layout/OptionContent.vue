<template>
    <div class="opinion-option-section mt-16 blur">
        <ReOption :description="option.description"
                  :blur="!voted" :voted="voted"
                  :percentages="option.voted_percentage"
                  @onAction="setTipId"
        />
    </div>
</template>

<script>
    import ReOption from "../../reusableСomponents/ReOption";
    import {mapState} from "vuex";
    export default {
        name: "OptionContent",
        props:{
          id:Number,
          voted:Boolean,
          option:Object,
          voteId:Number
        },
        components: {ReOption},
        computed: {
            ...mapState('OpinionStore', {
                tipId: ({tipId}) => tipId,
            }),
        },
        methods: {
            setTipId(){
                this.$store.commit('OpinionStore/setTipId', this.tipId === this.voteId ? null : this.voteId )
            }
        }

    }
</script>

<style lang="scss">

    .opinion-option-section {

    }
</style>
