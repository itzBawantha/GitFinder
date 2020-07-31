const readline = require('readline');
const fs = require('fs');
var request = require("request");

try {

var input2 = process.argv[2];

getSubdomains(input2);
setTimeout(() => {
  GitFinder()
}, 2000);

}catch(e){

console.log("");
console.log("Usage : main.js <url> <file Path> <api Key>");
console.log("");

}

try{

function GitFinder() {
  

  var args = process.argv[3];

  const readInterface = readline.createInterface({
      input: fs.createReadStream(args),
      console: false
  });
  
  var request = require('request');
  // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  
  var burp0_headers = {
      "Upgrade-Insecure-Requests": "1", 
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
      "Accept-Encoding": "gzip, deflate", 
      "Accept-Language": "en-US,en;q=0.9", 
      "Connection": "close"
  }
  
  
  readInterface.on('line', function(line) {
  
      var urlmain = line+"/.git/HEAD";
  
      var burp0_options = {
          url: urlmain,
          headers: burp0_headers,
          method: "get",
      }
  
      request(burp0_options, function (error, response, body) {
          // console.log('statusCode:', response && response.statusCode)
          // console.log(body);
          try {
              console.log("");
              console.log(urlmain);
              console.log(body.includes("ref: refs/heads/"));
          } catch (error) {
              console.log(false);
              // Debug Error 
              // console.log('error: ', error)
  
          }
          
          })
      
  });

}

function getSubdomains(url) {

var apikey = process.argv[4];

var options = {
  method: 'GET',
  url: 'https://api.securitytrails.com/v1/domain/'+ url +'/subdomains',
  qs: {children_only: 'false'},
  headers: {accept: 'application/json', apikey: apikey}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const subdomains = body;
  const subdomains1 = JSON.parse(subdomains);
  const subdomainsdump= subdomains1["subdomains"];
  var input3 = process.argv[3];

  for(var k in subdomainsdump) {
    var http  = "http://"+subdomainsdump[k]+"."+url+"\r\n";
    fs.appendFile(input3, http, function (err) {
      if (err) throw err;
    });
    var https = "https://"+subdomainsdump[k]+"."+url+"\r\n";
    fs.appendFile(input3, https, function (err) {
      if (err) throw err;
    });
  }
  // console.log(subdomainsdump);
});

// return 1;
}

}catch(e) {

console.log("");
console.log("Usage : main.js <url> <file Path> <api Key>");
console.log("");

}










