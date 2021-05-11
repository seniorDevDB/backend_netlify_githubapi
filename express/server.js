'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

const router = express.Router();

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


const axios = require('axios');

const base_url = "https://jobs.github.com/positions.json"

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

// Create User
router.post('/getJobsPerPage', (req, res) => {
  let url = base_url + '?page=' + req.body.pageNumber
  console.log("url", url)
  axios.get(url).then(result => {
    res.send(JSON.stringify({
      code: 'success',
      data: result.data,
      message: 'All Jobs'
    }));
  }).catch(err => {
    res.send(JSON.stringify({
      code: 'error',
      message: 'Error'
    }));
  })
});

router.post('/getSearchJobs', (req, res) => {
  const description = req.body.description;
  const location = req.body.location;
  const full_time = req.body.full_time;

  let url = base_url + '?description=' + description + '&location=' + location + '&full_time=' + full_time;
  console.log("url search", url)
  axios.get(url).then(result => {
    console.log("result", result)

    res.send(JSON.stringify({
      code: 'success',
      data: result.data,
      message: 'All Jobs'
    }));
  })
})

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

module.exports = app;
module.exports.handler = serverless(app);
