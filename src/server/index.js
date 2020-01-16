const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage, fileSize: 1000});

const app = express();
// const gpxParse = require('gpx-parse');
const FitParser = require('fit-file-parser').default;

let savedFile = null;

function fitParse(content, next, req, res) {
  const fitParser = new FitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    temperatureUnit: 'celsius',
    elapsedRecordField: true,
    mode: 'cascade'
  });

  return fitParser.parse(content, (error, data) => {
    // Handle result of parse method
    if (error) {
      next(error);
    } else {
      // res.send(
      //   `${JSON.stringify(
      //     data.activity.sessions[0].laps[0].records,
      //     null,
      //     2
      //   )}`
      // );

      const {records} = data.activity.sessions[0].laps[0];

      const heartBeats = records.map(record => ({
        y: record.heart_rate,
        x: record.timer_time
      }));
      const chartData = [
        {
          id: 'heart_rate',
          data: heartBeats
        }
      ];
      res.send(JSON.stringify(chartData, null, 2));
    }
  });
}

app.use(express.static('dist'));

app.use(bodyParser.json());
// app.use(cors);

const path = './test2.gpx';
// app.get('/api/gpx', (req, res, next) => {
//   if (!fs.existsSync(path)) {
//     next(`The file ${path} doesn't exist`);
//   }

//   gpxParse.parseGpxFromFile(path, (error, data) => {
//     if (error) {
//       next(`error: ${error}`);
//     } else {
//       res.send(`success, tracks number=${data.tracks.length}`);
//     }
//   });
// });
app.get('/api/fit', async (req, res, next) => {
  const fitPath = './test.fit';
  if (!fs.existsSync(fitPath)) {
    next(`The file ${fitPath} doesn't exist`);
  }
  if (savedFile != null) {
    return fitParse(savedFile.buffer, next, req, res);
  }
  return fs.readFile(fitPath, (err, content) => {
    return fitParse(content, next, req, res);
  });
});

app.post('/api/upload', upload.single('file'), async (req, res, next) => {
  if (req.file !== undefined) {
    savedFile = req.file;
    res.end();
  } else {
    next('Body was empty');
  }
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
