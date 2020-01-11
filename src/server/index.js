const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {promisify} = require('util');

const app = express();
const FILE_PATH = './todos.json';
const gpxParse = require('gpx-parse');
const FitParser = require('fit-file-parser').default;

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
  if (!fs.existsSync(path)) {
    next(`The file ${path} doesn't exist`);
  }

  gpxParse.parseGpxFromFile(path, (error, data) => {
    if (error) {
      next(`error: ${error}`);
    } else {
      res.send(`success, tracks number=${data.tracks.length}`);
    }
  });
});
app.get('/api/fit', async (req, res, next) => {
  const fitPath = './test.fit';
  if (!fs.existsSync(fitPath)) {
    next(`The file ${fitPath} doesn't exist`);
  }
  const fitParser = new FitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    temperatureUnit: 'celsius',
    elapsedRecordField: true,
    mode: 'cascade'
  });

  return fs.readFile(fitPath, (err, content) => {
    return fitParser.parse(content, (error, data) => {
      // Handle result of parse method
      if (error) {
        console.log('111111');
        next(error);
      } else {
        console.log('2222');
        res.send(JSON.stringify(data, null, 2));
      }
    });
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
