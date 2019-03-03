const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {promisify} = require('util');

const app = express();
const FILE_PATH = './todos.json';

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

app.get('/api/todos', (req, res, next) => {
  return readTodosFile()
    .then(data => res.send(data))
    .catch(next);
});

app.post('/api/todos', async (req, res, next) => {
  if (req.body === undefined) {
    next(`sent bad data for todos to server: "${JSON.stringify(req.body)}"`);
    return;
  }

  try {
    await writeTodosFile(req.body).catch(next);
  } catch (e) {
    next(`failed to write`);
    return;
  }

  res.end();
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
