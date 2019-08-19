<template lang="html">
    <div class="pt-15 pl-60 pr-20" :class="{'bg-white': !mobile}">
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
		components: {
			profile,
			routebar,
			languageChange
		},
        
        computed: {
            mobile() {
                return this.$root.mobile;
            },
        },

		mounted() {}
	};
</script>

<style lang="scss">
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
