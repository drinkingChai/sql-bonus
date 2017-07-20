// attempting piping version of data

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

function getRandMov() { // done is a global here so not taken as param
  db.all("SELECT id FROM movies", function(err, rows) {
    var rand_id = rows[Math.floor(Math.random()*rows.length)].id;
    done(rand_id);
  })
}


var data = [];
var fnQueue = [getRandMov];

function done(result) {
  data.push(result);
}
