export default {
    computed: {
        validHost(){
            if(this.link.substring(0, 17) === 'https://youtu.be/') return true
        },
        videoId(){
            return this.$youtube.getIdFromUrl(this.link)
        },
        thumbnailUrl(){
            const id = this.getId();
            return `https://img.youtube.com/vi/${id}/0.jpg`
        }
    },
    methods: {

        getId () {
            this.video_id = this.$youtube.getIdFromUrl(this.link)
            return this.video_id
        }
    }

}
