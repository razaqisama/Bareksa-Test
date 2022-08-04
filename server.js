require('dotenv').config()

const http = require('http');
const app = require('./src/app');
const PORT = process.env.PORT;
const server = http.createServer(app);

console.log(PORT)

server.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
})