var casper = require('casper').create();
var utils = require('utils');
//var result = null;
//Request the URL
casper.start().then(function() {
    this.open('http://www.impulsiveweb.com/')
      .then(function(resp){
        utils.dump(resp);
        //console.log(resp);
        //result = resp;
      });
});

casper.run(function() {
    //utils.dump(result);
    //require('utils').dump(JSON.parse(this.getPageContent()));
    //this.echo('finished');
    this.exit();
});
