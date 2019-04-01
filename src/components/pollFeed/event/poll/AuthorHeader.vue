<template>
    <div id='author-header'>

        <div @click="userLink(author.id)" class="author-avatar pointer" :style="{ 'background-image': 'url(' + author.path_to_avatar + ')' }" ></div>

        <div class="information-block">
            <div class="author-section flex-align-center flex-between">
                <div class="author-block">
                    <span @click="userLink(author.id)" class="username pointer">{{author.username}}</span>
                    <lang-string class="created" :title="'created'"/>  <lang-string v-if="!poll.end_date" class="created-poll font-14" :title="'poll'"/> <lang-string  v-if="poll.end_date" class="created-poll" :title="'prediction'"/>
                </div>
                <div class="icon-more" v-if="user && user.authorities === 'USER' ">
                    <icon-base
                            fill="none"
                            width="14"
                            height="4"
                            viewBox="0 0 14 4"
                            icon-name="more">
                        <icon-more /></icon-base>
                </div>
                <el-dropdown v-if=" user && user.authorities === 'ADMIN'">
                    <div class="icon-more">
                        <icon-base
                                fill="none"
                                width="14"
                                height="4"
                                viewBox="0 0 14 4"
                                icon-name="more">
                            <icon-more /></icon-base>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item ><span @click="deletePoll(poll.id)">Удалить опрос</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="location-block flex-between">
                <div class="loc">
                    <span>{{author.location}}</span>
                </div>
                <div class="time-block">
                    <span class="time"><time-trans :time="item.timestamp"/></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import timeTrans from '../../../timeTrans'
    import IconBase from '../../../icons/IconBase.vue'
    import IconLocation from '../../../icons/IconLocation.vue'
    import IconMore from '../../../icons/IconMore.vue'
    import langString from '../../../langString.vue'
    import moment from 'moment'


    export default {
        name: "AuthorHeader",
        computed:{

        },

        filters: {
            moment: function (date) {
                return moment(date).format('HH:mm');
            }
        },
        methods: {

            moment: function () {

                return moment();

            },

            userLink(user_id){

                this.$router.push({name:'user',params:{id:user_id}})


            },


            deletePoll(poll_id){

                this.$store.dispatch(`pollFeed/deletePoll`, poll_id );

            }
        },
        components: {
            IconBase,
            IconLocation,
            IconMore,
            langString,
            timeTrans
        },
        props: ['author', 'type', 'poll', 'item', 'user']
    }

</script>

<style lang="scss">
    #author-header {
        display: flex;
        position: relative;
        .created-poll {
            text-transform: lowercase;
        }
        .created {

            text-transform: lowercase;
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            line-height: 11px;
            font-size: 14px;
            letter-spacing: -0.2px;
            color: #69777F;

        }
        .time {
            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            line-height: 12px;
            font-size: 12px;
            text-align: right;
            letter-spacing: -0.2px;
            color: #828D92;
        }
        .icon-more {
            display: flex;

        }
        .el-dropdown {

            position: absolute;
            right: 4px;
            top: 6px;
        }
        .author-avatar {
            width: 42px;
            height: 42px;
            border-radius: 1000px;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .information-block {
            margin-left: 9px;
            width: 90%;
            display: flex;
            flex-direction: column;
            .location-block {
                font-family: Roboto;
                font-style: normal;
                font-weight: 300;
                line-height: 11px;
                font-size: 12px;
                letter-spacing: -0.2px;
                color: #828D92;
                margin-top: 7px;
            }
            .username {
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                line-height: 18px;
                font-size: 14px;
                color: #152D3A;
            }
            .subject {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: 11px;
                font-size: 13px;
                letter-spacing: -0.2px;
                color: #828D92;
                b {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 11px;
                    font-size: 13px;
                    letter-spacing: -0.2px;
                    color: #152D3A;
                }

            }
        }
    }
</style>
