const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get("/", (req, resp) => {
    const x = 'Hello World!'
    resp.send(x)
})
function Errors(num1, num2) {
    if (num1 < -1000000 || num2 < -1000000 || (num1 + num2) < -1000000) {
        flag = true
        return ({
            status: "error",
            message: "Underflow"
        })
    }
    else if (num1 > 1000000 || num2 > 1000000 || (num1 + num2) > 1000000) {
        flag = true
        return ({
            status: "error",
            message: "Overflow"
        })
    }
    else if (num1 >= 'a' && num1 <= 'z' || num2 >= 'a' && num2 <= 'z') {
        flag = true
        return ({
            status: "error",
            message: "Invalid data types"
        })
    }
    return false
}

app.post("/add", (req, res) => {
    let flag = false
    const { num1, num2 } = req.query
    const error = Errors(num1, num2)
    if (flag == true) {
        res.send(error)
    }
    else if (error === false) {
        let sum = Number(num1) + Number(num2)
        res.send(JSON.stringify(
            {
                status: "Success",
                message: "the sum of given two numbers",
                sum: sum
            }
        ))
    }
})

app.post("/sub", (req, res) => {
    let flag = false
    const { num1, num2 } = req.query
    const error = Errors(num1, num2)
    if (flag == true) {
        res.send(error)
    }
    else if (error === false) {
        let sub = Number(num1) - Number(num2)
        res.send(JSON.stringify(
            {
                status: "Success",
                message: "the subtraction of given two numbers",
                subtraction: sub
            }
        ))
    }
})

app.post("/mul", (req, res) => {
    let flag = false
    const { num1, num2 } = req.query
    const error = Errors(num1, num2)
    if (flag == true) {
        res.send(error)
    }
    else if (error === false) {
        let mul = Number(num1) * Number(num2)
        res.send(JSON.stringify(
            {
                status: "Success",
                message: "the multiplication of given two numbers",
                multiplication: mul
            }
        ))
    }
})
app.post("/div", (req, res) => {
    let flag = false
    const { num1, num2 } = req.query
    const error = Errors(num1, num2)
    if (flag == true) {
        res.send(error)
    }
    else if (error === false) {
        let div = Number(num1) / Number(num2)
        res.send(JSON.stringify(
            {
                status: "Success",
                message: "the division of given two numbers",
                division: div
            }
        ))
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;