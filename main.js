var request = require('request');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
var burp0_headers = {
    "Upgrade-Insecure-Requests": "1", 
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
    "Accept-Encoding": "gzip, deflate", 
    "Accept-Language": "en-US,en;q=0.9", 
    "Connection": "close"
}

var burp0_options = {
    url: "http://mtransit.smartapps.mobitel.lk:80/.git/HEAD",
    headers: burp0_headers,
    method: "get",
}
request(burp0_options, function (error, response, body) {
console.log('statusCode:', response && response.statusCode)
console.log('error: ', error)
console.log('body: ', body)
})

