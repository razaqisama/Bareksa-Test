const db = require('../config/mongo');
const news = db.collection("news");
const {ObjectId} = require('mongodb');

class News {
    static find(query) {
        let filter = {}
        if (query?.tags) {
            filter["tags"] = {"$elemMatch": {"$in": query?.tags}}
        }
        if(query?.status) {
            filter["status"] = query?.status
        }

        return news.find(filter).toArray()
    }
    static findOneById(id) {
        return news.findOne({
            _id: ObjectId(id)
        })
    }
    static add(payload) {
        return news.insertOne(payload)
    }
    static updateOneById(id, payload) {
        return news.findOneAndUpdate(
            {_id: ObjectId(id)},
            {"$set" : payload}
        )
    }
    static deleteOne(id) {
        return news.findOneAndDelete({
            _id: ObjectId(id)
        })
    }
}

module.exports = News