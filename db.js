const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imdb-large.sqlite3.db'); //connect to db


function getBraveActors(fn) {
  db.all("SELECT first_name, last_name FROM movies \
    JOIN roles ON roles.movie_id=movies.id \
    JOIN actors ON roles.actor_id=actors.id \
    WHERE name='Braveheart' AND year=1995 ORDER BY last_name; ", function(err, rows) {
      fn(rows);
  })
}

module.exports = {
  getBraveActors: getBraveActors
}
