'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

const axios = require('axios');

const base_url = "https://jobs.github.com/positions.json"

router.get('/', (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };
  res.writeHead(200, headers);
  // res.write('<h1>Hello from okko</h1>');
  // res.end();
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


module.exports = app;
module.exports.handler = serverless(app);
