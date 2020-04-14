<template>
    <div class="footer-with-icons">
        <footer id="authed-footer">

            <div class="auth-block" :class="{'is_mobile_device': mobile}">
                <div class="flex-align-center " v-if="!$root.mobile">
                    <a class="flex pointer ml-10"
                       target="_blank"
                       rel="noreferrer noopener"
                       href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                    >
                        <DownloadOnTheAppStoreBadge :size-scale="1"/>
                    </a>

                    <a class="flex pointer ml-20"
                       target="_blank"
                       rel="noreferrer noopener"
                       href="https://play.google.com/store/apps/details?id=com.opinion"
                    >
                        <DownloadOnThePlayMarketBadge :size-scale="1"/>
                    </a>
                </div>

                <div>
                    <div class=" flex-align-center mb-45 mt-5" v-if="$root.mobile">
                        <a class="flex pointer"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://apps.apple.com/ru/app/opinion-%D0%BC%D0%B3%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F/id1490090282"
                        >
                            <DownloadOnTheAppStoreBadge :size-scale="1"/>
                        </a>

                        <a class="flex pointer ml-10"
                           target="_blank"
                           rel="noreferrer noopener"
                           href="https://play.google.com/store/apps/details?id=com.opinion"
                        >
                            <DownloadOnThePlayMarketBadge :size-scale="0.9"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import DownloadOnTheAppStoreBadge from '../../icons/DownloadOnTheAppStoreBadge'
    import DownloadOnThePlayMarketBadge from '../../icons/DownloadOnThePlayMarketBadge'
    export default {
        name: "authedFooter",
        computed: {
            isCreateRoute(){
                console.log(this.$route)
              return this.$route.name === 'createPoll'
            },
            mobile() {
                return this.$root.mobile;
            },
        },
        components:{
            DownloadOnTheAppStoreBadge,
            DownloadOnThePlayMarketBadge
        }
    }
</script>

<style lang="scss" >
    .footer-with-icons {
        #authed-footer {
            width: 100%;
            height: 80px;
            background: rgba(21, 45, 58, 0.9);
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
            position: fixed;
            left: 0;
            bottom: 0px;
            z-index: 1000;

            @media only screen and (min-width: 300px) and (max-width: 765px) {
                height: 62px;
                bottom: 44px;
            }
        }
        .auth-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 92px;
            width: 760px;
            margin: auto;
            padding-left: 260px;
            .download-caption {
                font-size: 12px;
                color: #ffffff;
            }
            @media only screen and (min-width: 300px) and (max-width: 765px) {
                box-sizing: border-box;
                width: 100%;
                padding-left: 10px;
                height: 102px;
                padding-right: 34px !important;
            }

            &.is_mobile_device {
                box-sizing: border-box;
                width: 100%;
                padding-left: 20px;
                padding-right: 10px !important;
                justify-content: center;
                text-align: center;
            }


            .logo-block {
                display: flex;
                align-items: center;

                /*margin-left: 25%;*/

                .text-logo {
                    path {
                        fill: #ffffff;
                    }
                }
            }
        }
    }

</style>
