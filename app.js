var http = require('http');
var child = require('child_process');
var mongoose = require('mongoose');
//var express = require('express');
http.createServer(function (req, res) {

    function get(){
      return new Promise(function(resolve, reject){
        var child_process = child.spawn('casperjs', ['casperDemo.js']);

        child_process.stdout.on('data', function(data){
          console.log('stdout', data.toString('ascii'));
          resolve(data.toString('ascii'));
        });

        child_process.stderr.on('data', function(data){
          console.log('stderr', data.toString('ascii'));
          reject(Error('Rejected'));
        });

        child_process.on('close', function (code) {
         console.log('child process exited with code ' + code);
        });
      });

    }
    get().then(function(resp){
      console.log('Success');
      mongoose.connect('mongodb://localhost:27017/TestApp');
      console.log('Connected to db!');
      var Schema = mongoose.Schema;
      var urlInfoSchema = new Schema({url:String, response:String});
      var urlInfo = mongoose.model('urlInfo', urlInfoSchema);
      var specificUrlInfo = urlInfo({
        url:'dummy',
        response: resp
      });
      specificUrlInfo.save(function(err){
        if(err) throw err;

        console.log('data saved');
      });

      urlInfo.find({}, function(err, data){
        if(err) throw err;

        console.log('data', data);
      });

      setTimeout(function(){
        mongoose.connection.close(function(){
        console.log('Connection closed');
        });
      }, 2000);
      }, function(error){
        console.log('Failed!', error);
    });



}).listen(8080);
