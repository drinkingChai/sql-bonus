const express = require('express');
const db = require('./db');
const nunjucks = require('nunjucks');


// PIPE!!!
const datapipe = require('./datapipe');
//


const app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
  express: app,
  noCache: true
})



app.get('/', function(req, res) {
  datapipe.getRandMov(function(data) {
    res.render('index', { data: data });
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening to port: ${port}`);
})
