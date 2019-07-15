export default {
	data() {
		return {
			scroll_difference: null
		}
	},
	methods: {
		setScrollDifference(ref, loader_height, emit_string = null) {
			loader_height = loader_height ? loader_height : 0;
			let scroll_difference = ref.scrollTop + ref.offsetHeight - ref.scrollHeight;
			this.scroll_difference = scroll_difference;
			if (emit_string) this.$emit(emit_string, scroll_difference >= -loader_height);
		}
	},
}
