var http = require("http");
const port = 8081
const httpServer = http.createServer(handleServer);


function handleServer(req, res) {
    if (req.url == "/welcome") {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end("Welcome to Dominos!")
    }
    else if (req.url == "/contact") {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(JSON.stringify(
            {
                phone: '18602100000',
                email: 'guestcaredominos@jublfood.com'
            }
        ))
    }
    else {
        res.writeHead(404,{"Content-type":"text/html"})
        res.end()
    }
}
httpServer.listen(port, ()=> {
    console.log(`Server is running on PORT ${port}`);
})

module.exports = httpServer;