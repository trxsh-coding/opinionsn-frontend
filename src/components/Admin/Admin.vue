<template>
    <div class="admin-wrapper">
        <router-link to="/admin/catalog">
            <el-button type="primary" size="small" round>
                Каталог
            </el-button>
        </router-link>
        <router-view/>

    </div>
</template>

<script>
    import Catalog from './Catalog.vue'
    export default {
        name: "Admin",
        data(){
            return {

            }
        },
        components: {
            Catalog

        }

    }
</script>

<style lang="scss">

    .el-button--primary {
        background:#4B97B4;
        border-color: inherit;
    }
    .el-button {
        padding: 10px 20px;
    }

</style>
