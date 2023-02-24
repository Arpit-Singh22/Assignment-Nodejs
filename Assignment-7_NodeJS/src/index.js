const express = require('express')
const app = express()
const port = 8080
app.use(express.json());
const mongoose = require("mongoose");
const Student = require("./model/student")


// connecting to database
const url = 'mongodb://localhost:27017/Student'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`MongoDB Connected: ${url}`)
    }
})

app.get("/api/student/", async (req, res) => {
    try {
        const student = await Student.find({})
        res.json({
            status: 'Success',
            result: student,
        })
    } catch (error) {
        res.json(error.message)
    }
})

app.get("/api/student/:id", async (req, res) => {
    const { id } = req.params
    try {
        const studentFound = await Student.findOne({ id })
        if (studentFound) {
            res.json({
                status: 'Success',
                result: studentFound,
            })
        }
        else {
            res.status(404).json({ status: 'Student ID Not Found' })
        }
    } catch (error) {
        res.json(error.message)
    }
})



app.post('/api/student/', async (req, res) => {
    const { id, name, currentClass, division } = req.body
    try {
        const idFound = await Student.findOne({ id })
        if (idFound) {
            res.json("Student ID already exist")
        }
        else {
            const student = await Student.create({
                id,
                name,
                currentClass,
                division,
            })
            res.json({
                status: 'Success',
                result: student,
            })
        }


    } catch (error) {
        res.json(error.message)
    }
})

app.put("/api/student/:id", async (req, res) => {
    const { id } = req.params
    try {
        const idFound = await Student.findOne({ id })
        if (idFound) {
            await Student.updateOne(idFound, req.body, () => {
                const { name } = req.body
                res.json({
                    name: name
                })
            })
        }
    } catch (error) {
        res.status(400)
    }
})

app.delete("/api/student/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Student.findOneAndDelete(id, (err) => {
            if (err) {
                res.status(404)
            }
            else {
                res.json("record deleted")
            }
        })

    } catch (error) {
        res.json(error.message)
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   