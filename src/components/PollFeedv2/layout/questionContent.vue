<template>
    <div class="question-content">
        <div class="question-tags">
            <span>{{tags}}</span>
        </div>
        <div class="question-subject mt-15">
            <span class="pointer" @click="RedirectToContent(pollId)" >{{subject}}</span>
        </div>
        <div class="question-description mt-11">
            <span >{{description}}</span>
        </div>

    </div>
</template>

<script>
    import RedirectMixin from "../../mixins/RedirectMixin";

    export default {
        name: "questionContent",
        mixins:[RedirectMixin],
        props: {
            tags:String,
            subject:String,
            description:String,
            pollId:Number
        }
    }
</script>

<style lang="scss">
    .question-content {
        padding: 0 16px;
        .question-tags {
            span {
                font-size: 12px;
                color: #4B97B4;
            }
        }
        .question-description {
            span {
                font-size: 13px;
                color: #000000;
            }
        }
        .question-subject {
            font-size: 17px;
            color: #000000;
            font-weight: 500;
        }
    }
</style>
