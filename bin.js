var parser = require("nomnom")
  , edgar = require('./edgar')
  , colors = require('colors')
  , _ = require('underscore')
  , Table = require('cli-table')

parser.command('ticker')
  .callback(function(opts){
    var tk = opts._[1]

    edgar.searchTicker(tk, {}, function(data){
      console.log(tk, ": ", data.name.yellow);
      
      if (data.filings){
        var table = new Table({
            head: _.keys(data.filings[0])
          , style : {compact : true, 'padding-left' : 1}
        })
        _.each(data.filings, function(f){
          var fil = []
          _.each(_.keys(data.filings[0]), function(v){
            var val = (f[v] + '').substring(0, 20)
            if (f[v].url){
              val = f[v].text.blue
            }
            fil.push(val)
          })
          table.push(fil)
        })

        console.log(table.toString())
      }
      //console.log(data)
    })
  })
  .help("Search for a company ticker")
    

parser.parse()
