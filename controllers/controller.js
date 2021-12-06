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
      query = query.concat('WHERE `F`.`year` >= ' + releasedonint);
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
          scripts: [ 'navbar','genre'],
          title: "Genres", // title of the web page
          results: results
        }
        res.render('director_results', data);
      }
    })
  },

  fetchActors: (req, res) => {
    /*
      SELECT CONCAT(F.first_name, " ", F.last_name) AS director, COUNT(F.movie_name) AS movie_cnt, F.year
      FROM fact_table F
      JOIN movies_genres MG ON MG.movie_id = F.movie_id
      GROUP BY director WITH ROLLUP;

      numofmovieschoice: formdata[0].value,
      numofmoviesint: formdata[1].value,
      releasedonschoice: formdata[2].value,
      releasedonint: formdata[3].value,
      genre:formdata[4].value
    */
    const query = 'SELECT CONCAT(F.first_name, " ", F.last_name) AS director, COUNT(F.movie_name) AS movie_cnt, F.year' +
                  'FROM fact_table F' +
                  'JOIN movies_genres MG ON MG.movie_id = F.movie_id';
    
  },

  fetchGenres: (req, res) => {
    /*
      SELECT CONCAT(F.first_name, " ", F.last_name) AS director, COUNT(F.movie_name) AS movie_cnt, F.year
      FROM fact_table F
      JOIN movies_genres MG ON MG.movie_id = F.movie_id
      GROUP BY director WITH ROLLUP;

      numofmovieschoice: formdata[0].value,
      numofmoviesint: formdata[1].value,
      releasedonschoice: formdata[2].value,
      releasedonint: formdata[3].value,
      genre:formdata[4].value
    */
    const query = 'SELECT CONCAT(F.first_name, " ", F.last_name) AS director, COUNT(F.movie_name) AS movie_cnt, F.year' +
                  'FROM fact_table F' +
                  'JOIN movies_genres MG ON MG.movie_id = F.movie_id';
    
  }




}

module.exports = controller
