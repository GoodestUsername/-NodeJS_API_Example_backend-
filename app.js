const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "/COMP4537/labs/4/";
let dictionary = [];
let count = 0;

http.createServer(function(req, res){
    res.writeHead(200,{
        "Content-Type":"text/html",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods": "*"
    });

    if(req.method === GET){
        count++;
        let response = {"count":count, "dictionary":dictionary};
        res.end(JSON.stringify(response));
    }

    if(req.method === POST && req.url === endPointRoot + "store/"){
        count++;
        let body = "";
        req.on('data', function(chunk){
            if(chunk != null){
                body += chunk;
            }
        });
        req.on('end', function() {
            let q = url.parse(body, true);
            let word = q.query.word;
            let definition = q.query.definition;
            let obj = {"word":word, "definition":definition};
            dictionary.push(obj);
            console.log(dictionary);
            res.end(word + " has successfully been added to the dictionary.");
        });
    }
}
).listen(8080);