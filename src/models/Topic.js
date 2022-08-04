const db = require('../config/mongo');
const Topics = db.collection("topics");
const { ObjectId } = require('mongodb')
class Topic {
    static find() {
        return Topics.find().toArray()
    }
    static findAndLookup({from, localField, foreignField, as}) {
        return Topics.aggregate([{
            "$lookup": {
                from,
                localField,
                foreignField,
                as,
            }
        }]).toArray()
    }
    static findOneById(id) {
        return Topics.findOne({
            _id: ObjectId(id)
        })
    }
    static add(payload) {
        return Topics.insertOne(payload)
    }
    static updateOneById(id, payload) {
        return Topics.findOneAndUpdate(
            {_id: ObjectId(id)}, 
            { "$set": payload}
        )
    }
    static removeOne(id) {
        return Topics.findOneAndDelete({
            _id: ObjectId(id)
        })
    }
}

module.exports = Topic