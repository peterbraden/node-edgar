var request = require('request')
  , _ = require('underscore')
  , jsdom = require('jsdom')

exports.searchTicker = function(ticker, opts, cb){
  var API_PATH = "http://www.sec.gov/cgi-bin/browse-edgar?"
    , API_SEARCH_PARAMS = "company=&match=&CIK=<%= query %>&filenum=&State=&Country=&SIC=&owner=exclude&Find=Find+Companies&action=getcompany"


  var url = API_PATH + _.template(API_SEARCH_PARAMS, {query: ticker})

  request(url, function(err, resp, body){

    if (err) throw err;
  
    var win = jsdom.jsdom(body, null, {features:{
      FetchExternalResources   : ['script'],
      ProcessExternalResources : ['script'],
      MutationEvents           : '2.0',
    }}).createWindow()
    
    jsdom.jQueryify(win, "http://code.jquery.com/jquery-1.5.min.js", function(errors){
      
      var $companyInfo = win.$('div.companyInfo')
        , companyName = $companyInfo.find('.companyName').text().replace("(see all company filings)", "")
        , companyAddress = win.$('.mailer').text()

      cb({
          name: companyName
        , address : companyAddress
      })
    })

  })
}

