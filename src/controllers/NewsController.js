const { News } = require('../models')
const {NewsValidationPayload} = require('../helpers/Validation');
const { ObjectId } = require('mongodb');
const redis = require('../config/redis');

const {filterNews} = require('../helpers/Filters');

class Controller {
    static async find(req, res, next) {
        const {
            tags,
            status,
            topicId
        } = req.query

        const query = {
            tags: tags ? tags.split(',') : null,
            status: status ? status : null,
            topicId: topicId ? topicId: null
        }

        try {
            const cache = await redis.get('news');
            if(cache) {
                const news = JSON.parse(cache);
                const filteredNews = filterNews(news, query);
                res.status(200).json({news: filteredNews});
            } else {
                const news = await News.find();
                const filteredNews = filterNews(news, query);

                await redis.set("news", JSON.stringify(news));
                
                res.status(200).json({
                    news:filteredNews
                });
            }

        } catch (err) {
            next(err);
        }
    }

    static async findById(req, res, next) {
        const id = req.params.id
        try {
            const news = await News.findOneById(id);
            if(news) {
                res.status(200).json({
                    news
                })
            } else {
                throw {
                    status: 404,
                    message: `News with id: ${id} not found`
                }
            }

        } catch (err) {
            next(err);
        }
    }

    static async add(req, res, next) {
        const payload = {
            topicId: ObjectId(req.body.topicId),
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            publishedDate: new Date().toLocaleString(),
            tags: req.body.tags,
            author: req.body.author
        }
        try {
            const validatedNews = NewsValidationPayload(payload);

            if(!validatedNews.isValid) {
                throw {
                    status: 400,
                    message: {
                        type: "Validation Error",
                        errors: validatedNews.message
                    }
                }
            }

            
            const addNews = await News.add(payload);
            
            if(addNews.insertedId) {
                await redis.del('news');
                await redis.del('topicsWithNews');
                res.status(201).json({
                    message: "News has been added",
                })
            } else  {
                throw {
                    status: 502,
                    message: "ERROR ON INSERT NEWS"
                }
            }

        } catch (err) {
            next(err)
        }
    }

    static async updateOneById(req, res, next) {
        const id = req.params.id
        
        const payload = {
            topicId: ObjectId(req.body.topicId),
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            publishedDate: req.body.publishedDate ? req.body.publishedDate : new Date().toLocaleString(),
            tags: req.body.tags,
            author: req.body.author,
        }

        try {
            const updatedNews = await News.updateOneById(id, payload);
            
            if(updatedNews.value) {
                await redis.del('news');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: "UPDATED",
                    updatedData: updatedNews.value
            })
            } else {
                throw {
                    status: 404,
                    message: `News with id: ${id}, not found`
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async removeNews(req, res, next) {
        const id = req.params.id

        const payload = {
            status: "deleted"
        }

        try {
            const removedNews = await News.updateOneById(id, payload);
            if(removedNews.value) {
                await redis.del('news');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: `News with id: ${id} removed `
                })
            } else {
                throw {
                    status: 404,
                    message: `News with id: ${id} not found`
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async publishNews(req, res, next) {
        const id = req.params.id

        const payload = {
            status: "published"
        }

        try {
            const publishedNews = await News.updateOneById(id, payload);
            console.log(publishedNews)
            if(publishedNews.value) {
                await redis.del('news');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: `News with id: ${id} has been published `
                })
            } else {
                throw {
                    status: 404,
                    message: `News with id ${id} not found`
                }
            }
        } catch (err) {
            next(err)
        }
    }
    
    static async deleteOne(req, res, next) {
        const id = req.params.id

        try {
            const deletedNews = await News.deleteOne(id);
            console.log(deletedNews)
            if(deletedNews.value) {
                await redis.del('news');
                await redis.del('topicsWithNews');
                res.status(200).json({
                    message: "DELETED"
                });
            } else {
                throw {
                    status: 404,
                    message: `News with id: ${id}, not found`
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;