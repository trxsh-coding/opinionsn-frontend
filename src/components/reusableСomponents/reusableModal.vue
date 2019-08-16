<template>
    <div class="modal-reusable">
        <slot>

        </slot>
    </div>
</template>

<script>
    export default {
        name: "reusableModal",
        props: {
            picture:Object

        }
    }
</script>

<style lang="scss">
    .modal-reusable {
        position: fixed;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);

    }
</style>