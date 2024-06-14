const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 4000;


const server = http.createServer(app);
server.listen(port,()=>{console.log('this app is running on '+port)});
