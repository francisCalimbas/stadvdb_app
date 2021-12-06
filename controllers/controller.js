const mysql = require('../db')

const db = mysql.db;

const controller = {

  getHome: (req, res) => {
    console.log("Home")
    const data = {
      styles: ['style'],
      scripts: [ 'home','navbar'],
      title: "Home Page" // title of the web page
    }
    res.render('home', data)
  },
  getDirectors: (req, res) => {
    console.log("Directors")
    const data = {
      styles: ['style'],
      scripts: [ 'navbar','director'],
      title: "Directors" // title of the web page
    }
    res.render('director', data)
  },

  getMovies: (req, res) => {
    console.log("Movies")
    const data = {
      styles: ['style'],
      scripts: [ 'navbar','movies'],
      title: "Movies" // title of the web page
    }
    res.render('movies', data)
  },

  getGenres: (req, res) => {
    console.log("Genres")
    const data = {
      styles: ['style'],
      scripts: [ 'navbar','genre'],
      title: "Genres" // title of the web page
    }
    res.render('genre', data)
  },

  fetchDirectors: (req, res) => {
    /*
      sample query:
      SELECT CONCAT(F.first_name, " ", F.last_name) AS director, COUNT(F.movie_name) AS movie_cnt
      FROM fact_table F
      JOIN movies_genres MG ON MG.movie_id = F.movie_id
      WHERE F.year < 1980 AND MG.genre = 'Horror'
      GROUP BY director
      HAVING movie_cnt >= 2;

      numofmovieschoice: formdata[0].value,
      numofmoviesint: formdata[1].value,
      releasedonschoice: formdata[2].value,
      releasedonint: formdata[3].value,
      genre:formdata[4].value
    */
   console.log('fetchdirec')
    const choice = req.query.numofmovieschoice;
    const numofmoviesint = req.query.numofmoviesint;
    const releasedonschoice = req.query.releasedonschoice;
    const releasedonint = req.query.releasedonint;
    const genre = req.query.genre;

    let query = 'SELECT CONCAT(`F`.first_name, " ", `F`.last_name) AS director, COUNT(`F`.movie_name) AS movie_cnt, `F`.`year` ' +
                  'FROM fact_table `F` ' +
                  'JOIN movies_genres `MG` ON `MG`.movie_id = `F`.movie_id ';
    var whereFlag = 0;
    // where
    if (releasedonschoice === 'ATLEAST') {
      query = query.concat('WHERE `F`.`year` > ' + releasedonint);
      whereFlag = 1;
    } else if (releasedonschoice === 'EQUAL TO') {
      query = query.concat('WHERE `F`.`year` = ' + releasedonint);
      whereFlag = 1;
    } else if (releasedonschoice === 'LESS THAN') {
      query = query.concat('WHERE `F`.`year` < ' + releasedonint);
      whereFlag = 1;
    }
    
    // 2nd where
    if (genre !== null && genre !== undefined && genre !== '') {
      if (whereFlag == 0) {
        query = query.concat('WHERE `MG`.`genre` = ' + '\'' + genre + '\'');
      } else if (whereFlag == 1) {
        query = query.concat(' AND `MG`.`genre` = ' + '\'' + genre + '\'');
      }
    }

    query = query.concat(' GROUP BY director');
    // having
    if (choice === 'ATLEAST') {
      query = query.concat(' HAVING `movie_cnt` >= ' + numofmoviesint);
    } else if (choice === 'EQUAL TO') {
      query = query.concat(' HAVING `movie_cnt` = ' + numofmoviesint);
    } else if (choice === 'LESS THAN') {
      query = query.concat(' HAVING `movie_cnt` < ' + numofmoviesint);
    }

    query = query + ';';
    console.log(query);
    db.query(query, function(err, results, fields) {
      if (err) console.log(err);
      else {
        console.log(results); // results contains rows returned by server
        const data = {
          styles: ['style'],
          scripts: [ 'navbar','director'],
          title: "Directors", // title of the web page
          results: results
        }
        res.render('director_results', data);
      }
    })
  },

  fetchMovies: (req, res) => {
    /*
      sample query:
      SELECT F.movie_name, COUNT(AR.role) AS role_cnt
      FROM fact_table F
      JOIN movies_genres MG ON F.movie_id = MG.movie_id
      JOIN actors_roles AR ON AR.movie_id = F.movie_id
      GROUP BY F.movie_name
      HAVING COUNT(AR.role) >= 10;

      numofroleschoice: formdata[0].value,
      numofrolesint: formdata[1].value,
      releasedonschoice: formdata[2].value,
      releasedonint: formdata[3].value,
      genre:formdata[4].value
    */
    console.log('fetchmovies')
    let query = 'SELECT `F`.`movie_name`, COUNT(AR.role) AS role_cnt ' +
                  'FROM fact_table `F` ' +
                  'JOIN movies_genres `MG` ON `MG`.`movie_id` = `F`.`movie_id` ' +
                  'JOIN actors_roles `AR` ON `AR`.`movie_id` = `F`.`movie_id` ';
    const numofroleschoice = req.query.numofmovieschoice;
    const numofrolesint = req.query.numofmoviesint;
    const releasedonschoice = req.query.releasedonschoice;
    const releasedonint = req.query.releasedonint;
    const genre = req.query.genre;
    
    var whereFlag = 0;

    // 1st where
    if (releasedonint !== null && releasedonint !== undefined && releasedonint !== '') {
      if (releasedonschoice === 'ATLEAST') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` > ' + releasedonint);
          whereFlag = 1;
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` > ' + releasedonint);
        }
        // end
      } else if (releasedonschoice === 'EQUAL TO') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` = ' + releasedonint);
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` = ' + releasedonint);
        }
        // end
      } else if (releasedonschoice === 'LESS THAN') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` < ' + releasedonint);
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` < ' + releasedonint);
        }
        // end
      }
    }

    // 2nd where
    if (genre !== null && genre !== undefined && genre !== '') {
      if (whereFlag == 0) {
        query = query.concat('WHERE `MG`.`genre` = ' + '\'' + genre + '\'');
        whereFlag = 1;
      } else if (whereFlag == 1) {
        query = query.concat(' AND `MG`.`genre` = ' + '\'' + genre + '\'');
      }
    }

    query = query.concat(' GROUP BY `F`.`movie_name`');
    // having
    if (numofroleschoice === 'ATLEAST') {
      query = query.concat(' HAVING `role_cnt` >= ' + numofrolesint);
    } else if (numofroleschoice === 'EQUAL TO') {
      query = query.concat(' HAVING `role_cnt` = ' + numofrolesint);
    } else if (numofroleschoice === 'LESS THAN') {
      query = query.concat(' HAVING `role_cnt` < ' + numofrolesint);
    }

    query = query + ';';
    console.log(query);
    db.query(query, function(err, results, fields) {
      if (err) console.log(err);
      else {
        console.log(results); // results contains rows returned by server
        const data = {
          styles: ['style'],
          scripts: [ 'navbar','movies'],
          title: "Movies", // title of the web page
          results: results
        }
        res.render('movies_results', data);
      }
    })
  },

  fetchGenres: (req, res) => {
    /*
      sample query:
      SELECT COUNT(F.movie_id) AS movie_cnt, MG.genre
      FROM fact_table F
      JOIN movies_genres MG ON F.movie_id = MG.movie_id
      WHERE F.rank >= 5.0 AND F.year > 1990
      GROUP BY MG.genre;

      rankchoice: formdata[0].value,
      rankint: formdata[1].value,
      releasedonschoice: formdata[2].value,
      releasedonint: formdata[3].value,
      genre:formdata[4].value
    */
    console.log('fetchgenre')
    const rankchoice = req.query.rankchoice;
    const rankint = req.query.rankint;
    const releasedonschoice = req.query.releasedonschoice;
    const releasedonint = req.query.releasedonint;
    const genre = req.query.genre;

    let query = 'SELECT COUNT(`F`.movie_id) AS movie_cnt, `MG`.`genre` ' +
                'FROM fact_table `F` ' +
                'JOIN movies_genres `MG` ON `MG`.movie_id = `F`.`movie_id` ';
    var whereFlag = 0;
    // 1st where
    if (rankchoice === 'ATLEAST') {
      query = query.concat('WHERE `F`.`rank` >= ' + rankint);
      whereFlag = 1;
    } else if (rankchoice === 'EQUAL TO') {
      query = query.concat('WHERE `F`.`rank` = ' + rankint);
      whereFlag = 1;
    } else if (rankchoice === 'LESS THAN') {
      query = query.concat('WHERE `F`.`rank` < ' + rankint);
      whereFlag = 1;
    }

    // 2nd where
    if (genre !== null && genre !== undefined && genre !== '') {
      if (whereFlag == 0) {
        query = query.concat('WHERE `MG`.`genre` = ' + '\'' + genre + '\'');
        whereFlag = 1;
      } else if (whereFlag == 1) {
        query = query.concat(' AND `MG`.`genre` = ' + '\'' + genre + '\'');
      }
    }

    // 3rd where
    if (releasedonint !== null && releasedonint !== undefined && releasedonint !== '') {
      if (releasedonschoice === 'ATLEAST') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` > ' + releasedonint);
          whereFlag = 1;
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` > ' + releasedonint);
        }
        // end
      } else if (releasedonschoice === 'EQUAL TO') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` = ' + releasedonint);
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` = ' + releasedonint);
        }
        // end
      } else if (releasedonschoice === 'LESS THAN') {
        if (whereFlag == 0) {
          query = query.concat('WHERE `F`.`year` < ' + releasedonint);
        } else if (whereFlag == 1) {
          query = query.concat(' AND `F`.`year` < ' + releasedonint);
        }
        // end
      }
    }

    query = query.concat(' GROUP BY `MG`.`genre`');
    
    query = query + ';';
    console.log(query);
    db.query(query, function(err, results, fields) {
      if (err) console.log(err);
      else {
        console.log(results); // results contains rows returned by server
        const data = {
          styles: ['style'],
          scripts: [ 'navbar','genre'],
          title: "Genres", // title of the web page
          results: results
        }
        res.render('genre_results', data);
      }
    })
  }




}

module.exports = controller
