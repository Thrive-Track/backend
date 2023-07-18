const http = require('http');

const app = require('../app');

const server = http.createServer(app);

const PORT = process.env.PORT || 4004;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
