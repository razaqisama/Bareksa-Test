const route = require('express').Router()
const {
    TopicsController
} = require('../controllers')

route.get('/', TopicsController.find);
route.get('/news', TopicsController.findNewsByTopic)

route.post('/', TopicsController.add);
route.get('/:id', TopicsController.findById);
route.put('/:id', TopicsController.updateOneById);
route.delete('/:id', TopicsController.removeOne);




module.exports = route;