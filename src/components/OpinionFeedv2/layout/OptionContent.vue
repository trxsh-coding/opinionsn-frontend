<template>
    <div class="opinion-option-section mt-16 blur">
        <ReOption :description="option.description"
                  :blur="!voted" :voted="voted"
                  :percentages="option.voted_percentage"
        />
    </div>
</template>

<script>
    import ReOption from "../../reusableСomponents/ReOption";
    export default {
        name: "OptionContent",
        props:{
          id:Number,
          voted:Boolean,
          option:Object
        },
        components: {ReOption},

    }
</script>

<style lang="scss">

    .opinion-option-section {

    }
</style>
