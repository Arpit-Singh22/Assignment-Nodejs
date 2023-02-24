const http = require("http")
const express = require("express")
const PORT = 5000
const app = express()


const fs = require("fs")
fs.writeFile("/index.html", '<h1> Hello World </h1><p> This is Arpit Singh... </p> ', (err,html) => {
           console.log('File has written');
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})

app.get("/",(req,resp) => {
    let x = fs.readFileSync('index.html')
    resp.end(x)
})

