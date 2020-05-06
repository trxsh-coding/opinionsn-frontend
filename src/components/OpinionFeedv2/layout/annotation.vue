<template>
    <div class="annotation-block"  v-observe-visibility="visibilityChanged">
        <post-header :author="author" :event="item.eventType" :time-stamp="creationTime" :id="vote.id"/>
        <option-content :id="vote.selected_variable" :voted="item.voted" :option="option"/>
        <subject-content class="mt-14" :id="vote.poll_id" :vote-index="index"/>
        <bows-section :bows="Object.values(option.bows)"
                      :main-bow="item.mainUserBow"
                      :author-id="author.id"
                      :total-amount-votes="item.amountOfVoted"
                      :id="vote.poll_id"
                      :voted="item.voted"
        />
        {{isOverflowing}}
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import PostHeader from "./header";
    import OptionContent from "./OptionContent";
    import SubjectContent from "./SubjectContent";
    import IconsSection from "./iconsSection";
    import BowsSection from "./BowsSection";

    export default {
                name: "annotation",
        components: {BowsSection, IconsSection, SubjectContent, OptionContent, PostHeader},
        props: {
            item: Object,
            index:Number
        },
        data(){
          return {
              overflowed: null
          }
        },
        computed: {
            ...mapState("globalStore", {
                users: ({users}) => users,
                votes: ({votes}) => votes,
                options: ({options}) => options,

            }),
            vote(){
                const {item, votes} = this;
                return votes[item.id]
            },
            isOverflowing() {
                let element = this.$refs.name;
            },
            creationTime(){
                return this.vote.create_time;
            },
            option(){
                const {options} = this;
                return options[this.vote.selected_variable];
            },
            mobile() {
                return this.$root.mobile;
            },
            author(){
                const {vote, users} = this;
                const user = users[vote.author_id];
                return {
                    id: user.id,
                    username: user.username,
                    url: user.path_to_avatar
                }

            },


        },
        methods: {
            visibilityChanged (isVisible, entry) {
                this.overflowed = isVisible;
                if(isVisible) this.$emit('onOverflowed', this.vote.id, this.author.id)
            }
        }
    }
</script>

<style lang="scss">
    .annotation-block {
        padding: 15px;
        background-color: #FFFFFF;
        border-radius: 8px;
        border: 0.5px solid #E2E2E2;
        margin-bottom: 15px;
        @media only screen and (min-width: 300px) and (max-width: 765px) {
            border: none;
            border-radius: 0;
        }
    }
</style>
