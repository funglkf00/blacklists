var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
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

// handle post 

router.post('/blackcomment', function(req, res) {

  // get post information
  var name=req.body.blackname;
  var category=req.body.blackcategory;
  var comment=req.body.blackcomment; 
  console.log(name + category + comment);

    // insert into sql
    pool.connect().then(client=>{  
        // insert data
      //client.query("INSERT INTO blacklist_nominate(name, category, info) VALUES($1::varchar, $2::text, $3::text)", [name,category,comment])
        client.query("select * from blacklist")
        .then(res=>{
            console.log("Insert Success");
        })
    });

  // respond   
  res.send('thanks for the comment');
});

module.exports = router;
    