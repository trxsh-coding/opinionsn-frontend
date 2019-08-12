<template>
    <div class="navigation-aside-menu">
        
        <div class="create-poll-block br-6 pl-12 py-10 pointer flex-align-center" @click.prevent="routerPush('createPoll')">
            <icon-base
                    fill="none"
                    class="mr-12 pointer"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    icon-name="add"><icon-add-poll/>
            </icon-base>
            <lang-string
                    :title="'create_poll'"
            />
        </div>
        
        <div class="nav-menu">
            <ul>
                <li class="links py-12 pointer" @click="routerPush('pollFeed')">
                    <icon-base
                            :class="{active : routeName === 'pollFeed'}"
                            class="mr-13"
                            fill="none"
                            width="18"
                            height="18"
                            viewBox="0 0 19 19"
                            icon-name="add"><icon-poll-feed/>
                    </icon-base>
                    <lang-string
                            :class="{active : routeName === 'pollFeed'}"

                            :title="'main'" />
                </li>
                <li class="links py-12 pointer" @click="routerPush('voteFeed')">
                    <icon-base
                            :class="{active : routeName === 'voteFeed'}"
                            class="mr-12"
                            fill="none"
                            width="18"
                            height="18"
                            viewBox="0 0 19 19"
                            icon-name="opinion"><icon-opinion/>
                    </icon-base>
                    <lang-string
                            :class="{active : routeName === 'voteFeed'}"
                            :title="'opinion'" />
                </li>
                <li class="links py-11 pointer" @click="routerPush('bookmarkFeed')">
                    <icon-base
                            :class="{active : routeName === 'bookmarkFeed'}"
                            class="mr-10"
                            fill="none"
                            width="20"
                            height="20"
                            viewBox="1 0 13 18"
                            icon-name="add"><icon-bookmark/>
                    </icon-base>
                    <lang-string

                            :class="{active : routeName === 'bookmarkFeed'}"
                            :title="'bookmark'" />
                </li>
            </ul>
        </div>
    
        <div class="feedback-link br-6 mt-9 pl-12 py-10 pointer flex-align-center" @click.prevent="routerPush('feedback')">
            <icon-base
                    fill="white"
                    class="mr-11 pointer"
                    width="19"
                    height="17"
                    viewBox="0 0 21 19"
                    icon-name="speaker"><icon-speaker/>
            </icon-base>
            <lang-string
                    :title="'feedback'"
            />
        </div>
        
    </div>
</template>

<script>
    import IconBase from "../../../icons/IconBase";
    import iconAddPoll from "../../../icons/navigation/iconAddPoll";
    import IconPollFeed from "../../../icons/navigation/IconPollFeed";
    import IconOpinion from "../../../icons/navigation/IconOpinion";
    import IconBookmark from "../../../icons/navigation/IconBookmark";
    import IconSpeaker from "../../../icons/IconSpeaker";
    import langString from "../../../langString"
    export default {
        name: "menu",
        computed: {
          routeName(){
              return this.$route.name
          }
        },
        methods: {
            routerPush(linkName){

                this.$router.push({name:`${linkName}`})

            }
        },
        components: {iconAddPoll, IconBase, langString, IconPollFeed, IconOpinion, IconBookmark, IconSpeaker}
    }
</script>

<style lang="scss">
    .navigation-aside-menu {
        .active {
                opacity: 1 !important;
        }
        
        .create-poll-block {
            padding: 7.5px 10.5px;
            background: #4B97B4;
            
            span {
                font-family: Roboto, sans-serif;
                font-size: 13px;
                color: #FFFFFF;
            }
            
        }
        
        .feedback-link {
            background: #BBBDC2;
            
            span {
                font-family: Roboto, sans-serif;
                font-size: 13px;
                color: #FFFFFF;
            }
            
        }
        
        .nav-menu {
            border-radius: 6px;
            background: #FFFFFF;
            margin-top: 9px;

            ul {

                padding: 2px 12px;
                li {
                    border-bottom-width: 0.5px;
                    border-bottom-color: #CECFD3;
                    border-bottom-style: solid;
                    display: flex;
                    align-items: center;
                    &:nth-child(even){
                        padding: 9px 0px;
                    }
                    &:nth-child(odd){
                        padding: 12px 0;
                    }
                    &:last-of-type {
                        border-bottom: none;
                    }
                }

                span, svg {
                    opacity: 0.4;

                }
                span {
                    font-family: Roboto;
                    font-size: 13px;
                    color: #1A1E22;
                }
            }
        }
    }

</style>
