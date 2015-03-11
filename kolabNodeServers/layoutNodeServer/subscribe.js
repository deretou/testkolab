/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MongoClient= require('mongodb').MongoClient;
 
MongoClient.connect('mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX', function(err, db) {
    if(err) throw err;

  db.collection('socketbalanceds', function(err, collection) {
        if (err) throw err;
   
        var latest = collection.find({}).sort({ $natural: -1 }).limit(1);
 
        latest.nextObject(function(err, doc) {
            if (err) throw err;
 
            var query = { };
            
            var options = { tailable: true, awaitdata: true, numberOfRetries: -1 };
            var cursor = collection.find(query, options).sort({ $natural: 1 });
   if(cursor){
       (function next() {
                cursor.nextObject(function(err, message) {
                    if (err) throw err;
                    console.log(message);
                    next();
                });
            })(); 
   }
           
        });
    });
  });
