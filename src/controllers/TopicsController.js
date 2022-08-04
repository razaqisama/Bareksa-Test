const { Topic } = require('../models');
const redis = require('../config/redis');

class Controller {
    static async find(req, res, next) {
        try {
            const cache = await redis.get('topics');
            let topics;
            if(cache) {
                topics = JSON.parse(cache);
            } else {
                topics = await Topic.find();
                await redis.set('topics', JSON.stringify(topics));
            }

            res.status(200).json({
                topics
            });
        } catch (err) {
            next(err)
        }
    }

    static async findNewsByTopic(req, res, next) {
        try {
            const cache = await redis.get('topicsWithNews');
            let topicWithNews;
            if( cache) {
                topicWithNews = JSON.parse(cache);
            } else {
                topicWithNews = await Topic.findAndLookup({
                    from: 'news',
                    localField: '_id',
                    foreignField:'topicId',
                    as: "news"
                });
                await redis.set("topicsWithNews", JSON.stringify(topicWithNews));
            }

            res.status(200).json({
                data: topicWithNews
            })
        } catch (err) {
            next(err);
        }
    }
    
    static async findById(req, res, next) {
        const id = req.params.id
        try {
            const topic = await Topic.findOneById(id);
            if(topic) {
                res.status(200).json({
                    topic
                })
            } else {
                throw {
                    status: 404,
                    message: `Topic with id: ${id} not found`
                }
            }

        } catch (err) {
            next(err)

        }
    }

    static async add(req, res, next) {
        const payload = {
            title: req.body.title,
        }
        try {
            const addTopic = await Topic.add(payload);
            
            if(addTopic.insertedId) {
                await redis.del('topics');
                await redis.del('topicsWithNews');
                res.status(201).json({
                    message: "Topic has been added",
                })
            } else  {
                throw {
                    status: 502,
                    message: "ERROR ON INSERT TOPICS"
                }
            }

        } catch (err) {
            next(err)
        }
    }

    static async updateOneById(req, res, next) {
        const id = req.params.id
        const payload = {
            title: req.body.title
        }
        try {
            const updatedTopic = await Topic.updateOneById(id, payload);
            
            if(updatedTopic.value) {
                await redis.del('topics');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: "UPDATED",
                    updatedData: updatedTopic.value
            })
            } else {
                throw {
                    status: 404,
                    message: `Topic with id: ${id}, not found`
                }
            }
        } catch (err) {
            next(err)

        }
    }
    
    static async removeOne(req, res, next) {
        const id = req.params.id

        try {
            const deletedTopic = await Topic.removeOne(id);
            if(deletedTopic.value) {
                await redis.del('topics');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: "DELETED"
                });
            } else {
                throw {
                    status: 404,
                    message: `Topic with id: ${id}, not found`
                }
            }
        } catch (err) {
            next(err)

        }
    }
}

module.exports = Controller;