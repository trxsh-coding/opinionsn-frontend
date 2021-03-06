export default {
	data() {
		return {
			scrolled_to_bottom: null
		}
	},
	methods: {
		setScrollDifference(ref, loader_height, emit_string = null, root) {
			loader_height = loader_height ? loader_height : 50;
			let scrollTop = root ? window.scrollY : ref.scrollTop;
			let scroll_difference = scrollTop + ref.offsetHeight - ref.scrollHeight;
			let scrolled_to_bottom = scroll_difference >= -loader_height;

			if (root) {
				this.$root.scrolled_to_bottom = scrolled_to_bottom;
				this.$root.scroll_top = scrollTop;
			} else {
				this.scrolled_to_bottom = scrolled_to_bottom;
			}

			if (emit_string) this.$emit(emit_string, scrolled_to_bottom);
		}
	},
}
