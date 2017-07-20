const express = require('express');
const db = require('./db');
const nunjucks = require('nunjucks');

const app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
  express: app,
  noCache: true
})


var braveActors;
db.getBraveActors(function(item) { braveActors = item });

app.get('/', function(req, res) {
  res.render('index', { braves: braveActors });
})



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening to port: ${port}`);
})
