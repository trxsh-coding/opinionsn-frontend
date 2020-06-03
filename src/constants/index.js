export const questionTypes = {
    "0":'poll',
    "1":'prediction'
};

export const actionsStoreName = route =>{
    switch (route) {
        case 'QuestionsFeed':
            return 'pollFeed';
        case 'singlePoll':
            return 'singlePoll';
        default :
            return 'pollFeed';

    }
}

export const SHORT_TIME_TIMESTAMP_REGEX = /(час|мин|дн|ден|hour|min|day).[^\s]*/m;
