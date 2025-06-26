const http = require('http');

const hostname = '127.0.0.1'
const PORT = 3000

const server = http.createServer((req,res)=>{
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end("Hey There!")
    }else if (req.url === '/ice-tea') {
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end("Thanks for ordering ice-tea")
    }else{
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain')
        res.end("404 Not Found")
    }
})

server.listen(PORT, hostname, ()=>{
    console.log(`Server is listening on http://${hostname}:${PORT}`)
})