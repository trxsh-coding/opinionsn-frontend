import {mapState} from "vuex";

export default {
    computed: {

        ...mapState('globalStore', {
            globalStore: state => state,
            votes: ({votes}) =>votes,
            polls: ({polls}) =>polls,
            users: ({users}) =>users,
            options: ({options})=>options,
            comments: ({comments}) => comments,
            mainUser: ({mainUser}) => mainUser,
        }),

        vote() {

            let {item, votes} = this;

            return votes[item.id];

        },

        poll() {

            let {vote, polls, item} = this;

            return polls[vote.poll_id]

        },

        author: function () {
            let {vote, users, poll} = this;

            if(this.routeName === 'user') {
                return users[this.$route.params.id];

            } else {
                return users[vote.author_id];

            }

        },

        combinedOptions: function(){
            let {options_id: option_ids, options_list_id} = this.poll;
            let {selectedOption} = this.item;

            if (!option_ids) option_ids = options_list_id || [];

            return option_ids.map(option_id => {
                let option = this.options[option_id];
                return {option, isSelected: option_id === selectedOption};
            });

        },

        sortedOptions: function () {
            let {combinedOptions} = this;
            let sanOptions = [...combinedOptions];
            // Sort them by selected (in future it will allow to use multiple-selection)
            sanOptions.sort(({isSelected: a}, {isSelected: b}) => b - a);
            // Limit them either by 3 or the length of the whole things
            return sanOptions;
        },
        routeName(){
            return this.$route.name
        },

    }

}
