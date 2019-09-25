<template>
    <div class="navigation-aside-menu">
        
        <router-link class="create-poll-block br-6 pl-12 py-10 pointer flex-align-center" :to="{name: 'createPoll'}">
            <IconAddPoll height="18" width="18" class="mr-12"/>
            <lang-string title="create_poll"/>
        </router-link>
        
        <div class="nav-menu py-2">
            <router-link class="links py-12 px-12 pointer" :to="{name: 'pollFeed'}">
                <IconPollFeed class="mr-13" fill="#1A1E22" />
                <lang-string title="main" />
            </router-link>
            
            <router-link class="links py-12 px-12 pointer"  :to="{name: 'voteFeed'}">
                <IconOpinion class="mr-12"/>
                <lang-string title="opinion" />
            </router-link>
            
            <router-link class="links py-11 pl-13 pr-12 pointer" :to="{name: 'bookmarkFeed'}">
                <IconBookmark width="13" height="18" class="mr-15 ml-1" />
                <lang-string title="bookmark" />
            </router-link>
    
        </div>
    
        <router-link class="feedback-link br-6 mt-9 pl-12 py-10 pointer flex-align-center" :to="{name: 'feedback'}">
            <IconSpeaker class="mr-11" />
            <lang-string title="feedback"/>
        </router-link>
        
        <dropdown-list-reusable
                class="lang-switch br-6 flex-align-center mt-9"
                list-class="drop-list"
                width="100%"
                with-arrow>
            <template>
                <icon-base class="flag-icon" height="22" width="22" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;">
                    <icon-flag />
                </icon-base>
                
                <lang-string class="button-caption ml-10" title="choose_language" />
            </template>
            
            <template #items>
                <ul class="flex-column">
                    <li @click="changeLanguage(1)" class="option py-5 pr-10 pl-32 pointer flex-align-center"><span>English</span></li>
                    <li @click="changeLanguage(2)" class="option mt-5 py-5 pr-10 pl-32 pointer flex-align-center"><span>Русский</span></li>
                </ul>
            </template>
        </dropdown-list-reusable>
        
    </div>
</template>

<script>
    import IconBase from "../../../icons/IconBase";
    import IconSpeaker from "../../../icons/IconSpeaker";
    import langString from "../../../langString"
    import DropdownListReusable from "@/components/reusableСomponents/DropdownListReusable";
    import axios from "axios";
    import IconFlag from "@/components/icons/IconFlag";
    import IconBookmark from "@/components/icons/IconBookmark";
    import IconAddPoll from "@/components/icons/IconAddPoll";
    import IconPollFeed from "@/components/icons/navigation/IconPollFeed";
    import IconOpinion from "@/components/icons/footer/IconOpinion";

    
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

            },
            
            changeLanguage(param) {
                axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/locale/${param}`).then(() => {
                    this.$store.dispatch('lang/getLocaleString')
                });
            }
        },
        components: {
            IconOpinion,
            IconPollFeed,
            IconAddPoll,
            IconBookmark,
            IconFlag,
            DropdownListReusable,
            IconBase, langString, IconSpeaker}
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
            background: #4BB48E;
            
            span {
                font-family: Roboto, sans-serif;
                font-size: 13px;
                color: #FFFFFF;
            }
            
        }
        
        .lang-switch {
            position: relative;
            width: 100%;
            height: 36px;
            background: #ffffff;
            
            * {
                font-family: Roboto;
                font-size: 13px;
                color: #1A1E22;
            }
            
            .drop-list {
                .option:hover {
                    background: #ebecef;
                }
            }
            
            .toggle-btn {
                width: inherit;
                height: inherit;
                padding: 0 10px;
                justify-content: flex-start;
                
                
                .icon-wrapper {
                    margin-left: auto !important;
                }
                
                .flag-icon {
                    stroke: #ADAFB3;
                }
    
                .button-caption {
                    font-family: Roboto;
                    font-size: 13px;
                    color: #ADAFB3;
                }
            }
            
            &.active {
                .button-caption {
                    color: #1A1E22;
                }
    
                .flag-icon {
                    stroke: #1A1E22;
                }
            }
        }
        
        .nav-menu {
            border-radius: 6px;
            background: #FFFFFF;
            margin-top: 9px;

            a {
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

</style>
