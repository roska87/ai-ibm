const server = require('./app');

let port = 3000;

server.listen(port, function () {
    console.log(`El servidor esta funcionando en el puerto: ${port}`);
});