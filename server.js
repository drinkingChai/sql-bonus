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


// function done(data) {
//   app.get('/rand', function(req, res) {
//     res.render('index', { data: data });
//   })
// }

app.get('/', function(req, res) {
  db.getRandMovData(res);
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening to port: ${port}`);
})
