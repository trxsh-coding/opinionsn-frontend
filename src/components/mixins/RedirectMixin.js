export default {
    methods: {
        RedirectToContent(id){
            this.$router.push({name: 'singlePoll', params: {id: id}})
        },
        RedirectToAuthor(user_id){

            this.$router.push({name: 'user', params: {id: user_id}})

        },
    }
}
