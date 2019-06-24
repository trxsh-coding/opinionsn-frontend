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
                <lang-string :title="'main'"/>

            </li>
            <li class="footer-icon">
                <icon-base
                        class="add-poll"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="icon-main"><icon-main/>
                </icon-base>
                <lang-string :title="'main'"/>
            </li>
            <li class="footer-icon">
                <icon-base
                        class="add-poll"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="icon-main"><icon-main/>
                </icon-base>
                <lang-string :title="'main'"/>
            </li>
            <li class="footer-icon">
                <icon-base
                        class="add-poll"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="icon-main"><icon-main/>
                </icon-base>
                <lang-string :title="'main'"/>
            </li>
            <li class="footer-icon">
                <icon-base
                        class="add-poll"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        icon-name="icon-main"><icon-main/>
                </icon-base>
                <lang-string :title="'main'"/>
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
    import langMixin from '../../mixins/langMixin'
    import langString from '../../langString'

    export default {
        name: "footer",
        mixins:[langMixin],
        components:{IconBase, IconMain, IconMenu, IconNotifications, IconSearch, langString}
    }
</script>

<style lang="scss" scoped>
    .mobile-footer {
        border-top: 1px solid #BEC0C5;
        width: 100%;
        background: #F8F8F8;
        position: fixed;
        bottom: 0;
        padding: 5px 24px 4px;
        ul {

            display: inline-flex;
            justify-content: space-between;
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
</style>
