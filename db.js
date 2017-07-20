const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imdb-large.sqlite3.db'); //connect to db


var data = {};

function getRandMovData(done) {
  data = {};  // clear out the data
  db.all("SELECT id FROM movies", function(err, rows) {
    rand_id = rows[Math.floor(Math.random()*rows.length)].id;
    db.get("SELECT * FROM movies WHERE id=?", rand_id, function(err, result) {
      data.movie = result;
      db.all("SELECT * FROM directors \
              JOIN movies_directors \
              ON directors.id=movies_directors.director_id \
              WHERE movies_directors.movie_id=?", rand_id, function(err, result) {
                data.directors = result;
              }, function(err, result) {
                db.all("SELECT * FROM actors \
                        JOIN roles \
                        ON roles.actor_id=actors.id \
                        WHERE roles.movie_id=?", rand_id, function(err, result) {
                          data.actors = result;
                          done(data);
                        })
              })
    })
  })
}


module.exports = {
  getRandMovData: getRandMovData
}
