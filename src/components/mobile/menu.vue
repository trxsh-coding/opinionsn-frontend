<template lang="html">
    <div class="mobile-menu pt-15 pl-60 pr-20" :class="{'bg-white': !mobile}">
        <profile v-if="mobile"/>
        
        <routebar/>
        
        <dropdown-list-reusable
                class="lang-switch flex-align-center"
                list-class="drop-list"
                button-class="trigger py-11 pl-7"
                width="100%"
                click-close
                with-arrow>
            <template>
                <icon-base class="flag-icon" height="22" width="22" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;">
                    <icon-flag />
                </icon-base>
            
                <lang-string class="button-caption ml-15" title="choose_language" />
            </template>
        
            <template #items>
                <ul class="flex-column list">
                    <li @click="changeLanguage(1)" class="option br-6 py-5 pr-10 pl-32 pointer flex-align-center"><span>English</span></li>
                    <li @click="changeLanguage(2)" class="option br-6 mt-5 py-5 pr-10 pl-32 pointer flex-align-center"><span>Русский</span></li>
                </ul>
            </template>
        </dropdown-list-reusable>
        
		<div class="copyright flex-space-center mt-13">
            <span>© 2019 OPINION</span>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import routebar from "./routebar";
	import profile from "./profile";
    import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
    import IconBase from "@/components/icons/IconBase";
    import IconFlag from "@/components/icons/IconFlag";
    import LangString from "@/components/langString";
    
    export default {
		components: {
            LangString,
            IconFlag,
            IconBase,
			profile,
			routebar,
            DropdownListReusable
		},
        
        computed: {
            mobile() {
                return this.$root.mobile;
            },
        },
    
        methods: {
            changeLanguage(param) {
                axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/locale/${param}`).then(() => {
                    this.$store.dispatch('lang/getLocaleString')
                });
            }
        },
	};
</script>

<style lang="scss">
    .mobile-menu {
    
        .lang-switch {
            width: 100% !important;
            
            .trigger {
                width: 100% !important;
                justify-content: flex-start;
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                color: #1A1E22;
                
                .icon-wrapper {
                    margin-left: auto !important;
                }
            }
            
            .list {
                li:hover {
                    background: #add0dd;
                }
            }
        }
    
        .copyright {
            // padding: 0 10px;
            span {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                letter-spacing: -0.3px;
                color: rgba(56, 56, 56, 0.7);
            }
        }
    }
	
</style>
