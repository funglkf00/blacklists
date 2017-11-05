var express = require('express');
var router = express.Router();
var pg = require('pg');



// pg connection
var config = {
  user: 'postgres', 
  database: 'blacklist', 
  password: 'blacklist', 
  host: 'localhost', 
  port: 5432, 
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);


// Query
function querytabdata(data, tabtopic){
  pool.connect(function(err, client, done) {  
    if(err) {
      return console.error('database connect error', err);
    }
    client.query("SELECT * from blacklist where category = '" + tabtopic + "'", function(err, result) {
      done();// release connecetion
      if(err) {
        return console.error('query error', err);
      }
      //console.log(result);
      for(var i in result.rows){
        data.name[i] = result.rows[i].name;
        data.category[i] = result.rows[i].category;
        //console.log(data.name[i]);
      }
      console.log(data);
    });
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  var tab_data1 = { name: ['default'], category: ['default'] };
  var tab_data2 = { name: ['default'], category: ['default'] };
  var tab_data3 = { name: ['default'], category: ['default'] };
  var tabtopic = ['mobile', 'restaurant', 'people'];
  querytabdata(tab_data1,tabtopic[0]);
  querytabdata(tab_data2, tabtopic[1]);
  querytabdata(tab_data3, tabtopic[2]);
  setTimeout(function () {

    res.render('index', { 
      title: 'Blacklists HK', 
      blacklist: tab_data1,
      Categoryist_top : ['Product','Company','Personal'],
      Categoryist_col1 : ['Mobile Phones','Mp3 Players'],
      Categoryist_col2 : ['Restaurant','Travel agent'],
      Categoryist_col3 : ['Faker','Lier'],
      tabtopic : ['mobile','restaurant','people']
    });

  }, 100);
});

module.exports = router;
