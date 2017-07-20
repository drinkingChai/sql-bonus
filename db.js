const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imdb-large.sqlite3.db'); //connect to db


function getDirectors(id, next) {
  db.all("SELECT * FROM directors \
          JOIN movies_directors \
          ON directors.id=movies_directors.director_id \
          WHERE movies_directors.movie_id=?", id, function(err, result) {
            data.push(result);
            if (next) next(id);
          })
}

function getMovData(id, next) {
  db.get("SELECT * FROM movies WHERE id=?", id, function(err, result) {
    data.push(result);
    if (next) next(id);
  })
}

function getRandMov(done) {
  db.all("SELECT id FROM movies", function(err, rows) {
    var rand_id = rows[Math.floor(Math.random()*rows.length)].id;
    done(rand_id);
  })
}


var data = [];
var fnQueue = [getRandMov, getMovData, getDirectors];


function done(result) {
  data.push(result);
}



// while(fnQueue.length) {
//   fnFrom = fnQueue.shift();
//   fnTo = fnQueue[0];
//   fnFrom(fnTo);
// }





module.exports = {
}
