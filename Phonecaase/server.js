const app = require('./app')
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});
const port = process.env.PORT || 3000
server.listen(port, function() {
    console.log(`Server started on port ${port}`);
  });