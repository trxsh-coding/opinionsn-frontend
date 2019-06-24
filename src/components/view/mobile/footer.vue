<template>
    <div class="mobile-footer">
        <ul>
            <li class="footer-icon">
                <icon-base
                        class="add-poll"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="icon-main"><icon-main/>
                </icon-base>
            </li>
            <li class="footer-icon">

            </li>
            <li class="footer-icon">

            </li>
            <li class="footer-icon">

            </li>
            <li class="footer-icon">

            </li>
        </ul>
    </div>
</template>

<script>
    import IconBase from '../../icons/IconBase'
    import IconMain from '../../icons/footer/IconMain'
    import IconMenu from '../../icons/footer/IconMenu'
    import IconNotifications from '../../icons/footer/IconNotifications'
    import IconSearch from '../../icons/footer/IconSearch'
    export default {
        name: "footer",
        components:{IconBase, IconMain, IconMenu, IconNotifications, IconSearch}
    }
</script>

<style lang="scss" scoped>
    .mobile-footer {
        width: 100%;
        background: #F8F8F8;
        position: fixed;
        bottom: 0;
        padding: 5px 24px 4px;
    }
</style>
