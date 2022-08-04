const route = require('express').Router()
const {
    NewsController
} = require('../controllers')

route.get('/', NewsController.find);
route.post('/', NewsController.add);
route.patch('/remove/:id', NewsController.removeNews);
route.patch('/publish/:id', NewsController.publishNews);
route.delete('/delete/:id', NewsController.deleteOne);
route.get('/:id', NewsController.findById);
route.put('/:id', NewsController.updateOneById);


module.exports = route;