<template>
    <div class="explain-reusable flex-align-center">
        <picture-reusable
                class="user-avatar pointer ml-15 mr-15"
                :img="publicPath + user.path_to_avatar"
                :size="30"
                bor-rad="50%"
        />
        <re-input :preset="3"
                  textarea
                  :params="{width : 295, height: 30, paddingRight:30, background:'#ffffff'}"
                  class="explain-input relative"
                  v-model="description"
                  placeholder="explain_your_opinion"
        >
            <icon-base
                    @click.native="sendExplain"
                    fill="none"
                    class="mr-12 pointer icon-send"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    icon-name="send">
                <icon-send/>
            </icon-base>
        </re-input>

    </div>
</template>

<script>
    import PictureReusable from "./PictureReusable";
    import InputReusable from "./InputReusable";
    import ReInput from "./ReInput";
    import IconBase from "../icons/IconBase";
    import IconSend from "../icons/IconSend";
    import axios from "axios"
    export default {
        name: "ReExplain",
        components: {IconBase, ReInput, InputReusable, PictureReusable, IconSend},
        props: ['user', 'poll_id'],
        data() {
            return {
                publicPath: process.env.VUE_APP_ASSETS,
            }
        },
        methods: {
            sendExplain(){
                let {poll_id, description} = this;
                this.$store.dispatch(`pollFeed/saveExplain`, {data: {poll_id, description}});
            }
        }
    }
</script>

<style lang="scss">
    .explain-reusable {
        background: rgba(173, 175, 179, 0.15);
        height: 50px;
        .explain-input {
            .icon-send {
                position: absolute;
                right: 0;
                top: 6px;
            }
        }
    }
</style>