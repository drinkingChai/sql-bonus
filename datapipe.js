// attempting piping version of data
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imdb-large.sqlite3.db'); //connect to db


function getActorsById(exprt, id) {
  db.all("SELECT * FROM actors \
          JOIN roles \
          ON actors.id=roles.actor_id \
          WHERE roles.movie_id=?", id, function(err, result) {
            data.actors = result;
            done(exprt, id);
          })
}

function getDirectorsById(exprt, id) {
  db.all("SELECT * FROM directors \
          JOIN movies_directors \
          ON directors.id=movies_directors.director_id \
          WHERE movies_directors.movie_id=?", id, function(err, result) {
            data.directors = result;
            done(exprt, id);
          })
}

function getMovById(exprt, id) {
  db.get("SELECT * FROM movies WHERE id=?", id, function(err, result) {
    data.movie = result;
    done(exprt, id);
  })
}

function getRandMovId(exprt) {
  db.all("SELECT id FROM movies", function(err, rows) {
    var rand_id = rows[Math.floor(Math.random()*rows.length)].id;
    data.rand_id = rand_id;
    done(exprt, rand_id);
  })
}


var data = {};
var fnQueue = [];

function done(exprt, output) {
  if (fnQueue.length) {
    fn = fnQueue.shift();
    fn(exprt, output);
  } else {
    exprt(data);
    data = {};  // clear out the data
    // console.log(data);
  }
}


function getRandMov(exprt) {
  fnQueue = [getMovById, getDirectorsById, getActorsById];
  getRandMovId(exprt);
}


module.exports = {
  getRandMov: getRandMov
}
