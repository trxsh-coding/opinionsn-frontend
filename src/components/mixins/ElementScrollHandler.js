export default {
	data() {
		return {
			scrolled_to_bottom: null
		}
	},
	methods: {
		setScrollDifference(ref, loader_height, emit_string = null, root) {
			loader_height = loader_height ? loader_height : 0;
			let scroll_difference = ref.scrollTop + ref.offsetHeight - ref.scrollHeight;
			let scrolled_to_bottom = scroll_difference >= -loader_height;

			if (root) {
				this.$root.scrolled_to_bottom = scrolled_to_bottom;
			} else {
				this.scrolled_to_bottom = scrolled_to_bottom;
			}

			if (emit_string) this.$emit(emit_string, scrolled_to_bottom);
		}
	},
}
