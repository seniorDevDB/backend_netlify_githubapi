'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser);

const axios = require('axios');

const base_url = "https://jobs.github.com/positions.json"

app.get('/', (req, res) => {
    res.send("ok")
})

app.post('/getJobsPerPage', (req, res) => {
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

app.post('/getSearchJobs', (req, res) => {
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

module.exports.handler = serverless(app);