const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {promisify} = require('util');

const app = express();
const FILE_PATH = './todos.json';
const gpxParse = require('gpx-parse');

const readTodosFile = () => {
  return promisify(fs.readFile)(FILE_PATH);
};

const writeTodosFile = todos => {
  return new Promise((resolve, reject) => {
    fs.writeFile(FILE_PATH, JSON.stringify({todos}), err => {
      if (err) {
        reject(err);
      }
    });
    resolve();
  });
};

app.use(express.static('dist'));

app.use(bodyParser.json());

const path = './test2.gpx';
app.get('/api/gpx', (req, res, next) => {
  gpxParse.parseGpxFromFile(path, (error, data) => {
    if (!fs.existsSync(path)) {
      next(`The file ${path} doesn't exist`);
    } else if (error) {
      next(`error: ${error}`);
    } else {
      res.send(`success, tracks number=${data.tracks.length}`);
    }
  });
});

// app.post('/api/todos', async (req, res, next) => {
//   if (req.body === undefined) {
//     next(`sent bad data for todos to server: "${JSON.stringify(req.body)}"`);
//     return;
//   }

//   try {
//     await writeTodosFile(req.body).catch(next);
//   } catch (e) {
//     next(`failed to write`);
//     return;
//   }

//   res.end();
// });

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
