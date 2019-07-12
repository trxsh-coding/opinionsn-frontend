<template lang="html">
    <div class="sidebar px-10" :class="{'bg-white': !mobile}">
        <profile v-if="mobile"/>
        <routebar/>
        <language-change/>
		<div class="copyright flex-space-center mt-13">
            <span>© 2019 OPINION</span>
        </div>
    </div>
</template>

<script>
	import routebar from "./routebar";
	import profile from "./profile";
	import languageChange from "../languageChange";

	export default {
		data() {
			return {
                mobile: this.$root.mobile
			};
		},
		components: {
			profile,
			routebar,
			languageChange
		},

		mounted() {}
	};
</script>

<style lang="scss">
    .sidebar {
        margin-top: 15px;
        margin-left: 60px;
        margin-right: 20px;
        border-radius: 6px;

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
</style>
