require('dotenv').config();
const http = require('http');
const port = 3000;
const LOG_INTERVAL = parseInt(process.env.LOG_INTERVAL) || 1000;
const LOG_STOP = parseInt(process.env.LOG_STOP) || 10000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url !== '/favicon.ico') {
    showdate().then(result => {
      res.end(new Date().toUTCString());
    });
  } else {
    res.end('Hello world!');
  }
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

function showdate () {
  return new Promise((resolve, reject) => {
    let stoplog = false;

    const logdate = () => {
      setTimeout(() => {
        console.log(new Date().toUTCString());
        if (!stoplog) {
          logdate();
        } else {
          resolve('result');
        }
      }, LOG_INTERVAL);
    };
    const run = () => {
      logdate();
      setTimeout(() => {
        console.log('stop log');
        stoplog = true;
      }, LOG_STOP);
    };
    run();
  });
}
