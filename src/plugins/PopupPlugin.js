import Vue from 'vue';

class PopupPlugin {
	constructor() {
		this.VM = new Vue({
			data: () => ({
				messages: []
			})
		});
	}
	
	get messages() {
		return this.VM.$data.messages;
	}
	
	insert(key, item) {
		if (key && item !== null) {
			if (Array.isArray(item)) {
				this.VM.$data[key] = [...this.VM.$data[key], ...item];
			} else {
				this.VM.$data[key].push(item);
			}
		}
	}
	
	remove(key, indexes) {
		if (key && indexes.length) {
			if (this.VM.$data[key]) {
				indexes.forEach(x => { delete this.VM.$data[key][x] });
				this.VM.$data[key] = this.VM.$data[key].filter(x => x !== undefined);
				console.log(this);
			}
		}
	}
	
	clear(key) {
		if (key) this.VM.$data[key] = [];
	}
}

export default {
	Store: PopupPlugin,
	install (Vue, options) {
		Vue.mixin({
			beforeCreate() {
				this.$popup = options.store;
			}
		})
	}
}