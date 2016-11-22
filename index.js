var express = require('express');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var Servion = function(opts){
  if(!(this instanceof Servion)){
    return new Servion(opts);
  }

  opts.backend.listen(opts.port);
}

Servion.disk = function(opts){
  var app = express();

  var temp = opts.temp; // TODO: support for tmp files.
  // tmp dir can be used for files that can be removed anytime.

  app.use('/', express.static(opts.path));

  app.post('*', function(req, res, next){
    console.log(req.path);
    var dst = path.join(opts.path, req.path);
    mkdirp(path.dirname(dst), function(err){
      if(err){
        res.status(500).send(err.toString());
      }
      var file = fs.createWriteStream(dst);
      req.pipe(file);

      req.once('error', function(err){
        res.status(500).send(err.toString());
      });

      file.once('error', function(err){
        res.status(500).send(err.toString());
      });

      file.once('finish', function(){
        res.status(201).end();
      });
    });
  });

  this.listen = function(port){
    app.listen(port);
  }

  return this;
}

module.exports = Servion;