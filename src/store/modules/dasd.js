relativeEndDate(){
    //console.log('Getter is called');
    let {poll, _lang} = this;
    let {end_date} = poll;
    moment.locale(_lang);

    // let relTime = moment(end_date).fromNow();

    this.now = moment(new Date());

    this.end = moment(end_date);

    // var duration = moment.duration(now.diff(end));
    //
    // var output = moment().format("hh:mm:ss");

    // return end;
},
},

methods:{

    getTime(){

        var duration = moment.duration(this.now.diff(this.end));
        console.log(duration)
        this.currentTime = this.relativeEndDate
    }

},

created() {
    this.relativeEndDate;
    this.currentTime = moment().format('LTS');
    setInterval(() => this.getTime(), 1 * 1000);
},
