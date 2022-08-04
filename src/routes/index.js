const route = require('express').Router();
const NewsRoute = require('./NewsRoutes');
const TopicsRoute = require('./TopicsRoute');

route.get('/', (req, res) => {
    res.send("App Deployed");
})

route.use('/news', NewsRoute);
route.use('/topics', TopicsRoute);

module.exports = route;