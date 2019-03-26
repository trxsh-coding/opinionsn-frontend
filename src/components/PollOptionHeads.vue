<template>
    <div class="poll-option-head-wrap">


        <div class="poll-option-head pointer" v-for="{id, picture} in sanitizedBows" :style="{'background-image': `url('${picture}')`}" @click="userLink(id)">
        </div>

        <div class="poll-option-head" v-if="canExpand" >
                &nbsp;+{{extraCount}}
        </div>

    </div>
</template>

<script>



    export default {

        data: () => ({
            expanded: false,
        }),

        name: "PollOptionHeads",
        props: ['option', 'limit'],

        computed: {

            sanitizedBows: function(){
                let {allBows, expanded, limit} = this;
                let opts = [...allBows];
                opts.splice(expanded ? opts.length : (opts.length === limit ? limit : limit-1), opts.length);

                return opts;
            },

            allBows: function(){
                let {option} = this;
                return Object.entries(option.bows).map(([id, picture])=>({id, picture}))
            },

            extraCount: function(){
                let {allBows, limit} = this;

                return allBows.length - limit + 1;
            },

            canExpand: function(){
                return this.allBows.length > this.limit;
            }


        },

        methods: {

            userLink(userId) {
                this.$router.push({name:'user',params:{id:userId}})
            },

        }



    }
</script>

<style scoped>

    .poll-option-head-wrap {
    }


    .poll-option-head-wrap .poll-option-head {
        display: block;
        float: left;
        background: #E4E7E9;
        border: white solid 1px;
        width: 22px;
        height: 22px;
        border-radius: 12px;
        background-size: cover;
        font-size: 12px;
        line-height: 22px;
        margin-left: -12px;

    }


    .poll-option-head-wrap .poll-option-head:first-child {
        color: red;
        margin-left: 12px;
    }

    @media only screen and (max-device-width : 500px) {



    }
</style>
