<template>
    <div class="bow-section flex-column">
        <div class="section-name">
            <span class=" font-13 pr-15">
            {{translateKeyword(sectionName)}}
        </span>
        </div>
        <bow-content v-for="(item) in data"
                     :url="item.path_to_avatar"
                     :username="item.username"
                     :time="item.date"
                     :voted="voted"
                     :userId="item.id"
                     :optionId="item.selected_variable"
                     :leader="sectionName === 'subscribers'"

        />
    </div>
</template>

<script>
    import BowContent from "./BowContent";
    import translateKeywordMixin from "../../mixins/translateKeywordMixin";
    import {mapState} from "vuex";
    export default {
        name: "BowAnnotation",
        components: {BowContent},
        mixins: [translateKeywordMixin],
        props:{
            data:{
                type:Array,
                required:true,
            },
            voted:Boolean,
            sectionName: String
        },
        computed: {

        },
    }
</script>

<style lang="scss">
    .section-name {
        text-align: right;
        font-weight: 300;
    }
    .name-block {

    }

</style>
