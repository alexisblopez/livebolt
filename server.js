var http = require('http');
var fs = require('fs');

//404 Response
function send404Response(response) {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}

function onRequest(request, response) {

    if(request.method == 'GET' && request.url == '/') {
        console.log(request.method);
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    } else if (request.url == "assets/css/main.css"){
        response.writeHead(200, {"Content-Type": "text/css"});
        fs.readFile("assets/css/main.css", function(err, data){
            response.end(data);
        });
    } else if (request.url == "/images/lock.png") {
        response.writeHead(200, {"Content-Type": "image/png"});

        fs.readFile("./images/background.jpg", function (err, data) {
            response.end(data);
        });
    } else {
        send404Response(response);
    }
}

http.createServer(onRequest).listen(8888);
console.log("Server is now running....");


