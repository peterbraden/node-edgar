var parser = require("nomnom")
  , edgar = require('./edgar')
  , colors = require('colors')


parser.command('ticker')
  .callback(function(opts){
    var tk = opts._[1]

    edgar.searchTicker(tk, {}, function(data){
      console.log(tk, ": ", data.name.yellow);
      console.log(data)
    })
  })
  .help("Search for a company ticker")
    

parser.parse()
