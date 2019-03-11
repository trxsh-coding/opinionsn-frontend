<template>
    <div class="mobile-nav">
        <ul>
            <li class="nav__item">
                <icon-base
                        width="27"
                        height="27"
                        viewBox="0 0 18 22"
                        icon-name="main"><icon-main/>
                </icon-base>
            </li>
            <li class="nav__item">
                <icon-base
                        :class="icon-opinion"
                        class="opinion"
                        width="27"
                        height="27"
                        viewBox="0 0 18 22"
                        icon-name="opinion"><icon-opinion/>
                </icon-base>
            </li>
            <li class="nav__item">
                <icon-base
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        icon-name="search"><icon-search/>
                </icon-base>
            </li>
            <li class="nav__item">
                <el-badge :value="0">
                    <icon-base
                            width="17"
                            height="22"
                            viewBox="0 0 17 23"
                            icon-name="bell"><icon-bell />
                    </icon-base>
                </el-badge>
            </li>
            <li class="nav__item" >
                <avatar class="avatar-25x25" ></avatar>
            </li>
            <li class="nav__item" @click="$emit('hide')">
                <icon-base
                        width="25"
                        height="22"
                        viewBox="0 0 25 22"
                        icon-name="menu"><icon-menu />
                </icon-base>
            </li>
        </ul>
    </div>
</template>

<script>
    import IconBase from './icons/IconBase'
    import IconMain from './icons/IconMain'
    import IconOpinion from './icons/IconOpinion'
    import IconSearch from './icons/IconSearch'
    import IconBell from './icons/IconBell'
    import IconMenu from './icons/IconMenu'
    import avatar from './user/Event/modules/mainUserAvatar'
    export default {
        name: "mobileNav",
        props:['mobile_hide'],
        data(){
            return {
                hide: this.mobile_hide
            }
        },
        computed: {


        },
        methods: {

            changeLink: function () {
                console.log(this.mobile_hide)
                this.mobile_hide = !this.mobile_hide
                console.log(this.mobile_hide)
                this.$emit('hide', {hide: this.mobile_hide})

            }

        },
        components: {

            IconBase,
            IconMain,
            IconOpinion,
            IconSearch,
            IconBell,
            avatar,
            IconMenu

        }
    }
</script>

<style lang="scss">
    .mobile-nav {

        ul {

            display: inline-flex;
            list-style: none;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: 0px;
            align-items: center;

                g {

                    fill: #f4f4f4f4;

                }

        }
        .el-badge {

            margin: 0px !important;

            .el-badge__content {

                position: absolute;
                top: 0px !important;

            }

        }


    }
</style>
