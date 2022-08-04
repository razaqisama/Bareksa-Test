function filterNews (news, query) {
    const filteredNews = news.filter((item) => {
        let queryTags = 0;
        let queryStatus = 0;
        let queryTopicId = 0;

        if(query.tags?.length) {
            for(let i = 0; i < query.tags.length; i++) {
                 if(item.tags.includes(query.tags[i])) {
                    queryTags = 1
                 }
            }
        } else {
            queryTags = 1
        }
    
        if(query.status) {
            if(query.status === item.status) {
                queryStatus = 1
            }
        } else {
            queryStatus = 1
        }

        if(query.topicId) {
            if(query.topicId === item.topicId) {
                queryTopicId = 1
            }
        } else {
            queryTopicId = 1
        }
        
        return queryTags 
        && queryStatus 
        && queryTopicId
    })

    return filteredNews
}

module.exports = filterNews