<template>
    <div class="question-option-bows relative flex-align-center">
        <RePicture size="28" rounded class="bow-item"
                   @click.native="openBows"
                   :url="Object.values(bows)[0].path_to_avatar | addAssetsPath"
        />
        <ReModal v-if="showModal" :width="mobile ? '100%' : '500px'"
                 :br="mobile ? 0 : '10px'"
                 :height="mobile ? '100%' : '500px'"
                 overflow @onCloseModal="closeModal"
                 @onScrolledBottom="onScrolled"
                 :is-opened="showModal"
        >
            <bow-annotation section-name="subscribers"
                            :data="Object.values(bows)"
                            :poll-id="id"
                            :voted="voted"
            />
            <bows-feed :id="pollId" v-show="Object.values(bows).length" :voted="voted" />
        </ReModal>
    </div>
</template>

<script>
    import RePicture from "../../reusableСomponents/RePicture";
    import ReModal from "../../reusableСomponents/ReModal";
    import BowAnnotation from "../../BowsFeed/layout/BowAnnotation";
    import BowsFeed from "../../BowsFeed/BowsFeed";
    export default {
         name: "optionBows",
        props:{
            bows:Object,
            pollId:Number
        },
        data(){
             return {
                showModal: false
             }
        },
        methods: {
            openBows(){
                this.showModal = true
            },
            closeModal(){
                this.showModal = false
            }
        },
        components: {BowsFeed, BowAnnotation, ReModal, RePicture}
    }
</script>

<style lang="scss">
    .question-option-bows {
        .bow-item {
            position: absolute;
            top:-3px;
            z-index: 10;
        }
    }
</style>
