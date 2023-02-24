const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog', async (req, res) => {
    const { page, search } = req.query
    
    try {
        const blog = await Blog.find({ topic: search })
        // console.log(blog);
        if (blog) {
            res.json({ blog })
        }
    } catch (error) {
        res.json(error.message)
    }
})

router.post('/blog', async (req, res) => {
    const { topic, description, posted_by } = req.body
    try {
        // check if blog exist
        // const blogFound = await Blog.findOne({ topic })
        // // console.log(blogFound)
        // // if (blogFound) {
        // //     return res.json({
        // //         msg: 'blog Already Exist'
        // //     })
        // // }
        const blog = await Blog.create({
            topic,
            description,
            posted_by
        })
        res.json({
            status: 'Success',
            result: blog,
        })
    } catch (error) {
        res.json(error.message)
    }
})

router.put("/blog/:id", async (req, res) => {
    const { id } = req.params
    try {
        const idFound = await Blog.findById(id)
        // console.log(idFound)
        if (idFound) {
            await Blog.updateOne(idFound, req.body, () => {
                res.json({
                    status: 'Success',
                    result: req.body
                })
            })
        }
    } catch (error) {
        res.json(error.message)
    }
})
router.delete("/blog/:id", async (req, res) => {
    const { id } = req.params
    try {
        // const idFound = await Blog.findById(id)
        // if (idFound) {
        await Blog.findOneAndDelete(id, (err) => {
            if (!err) {
                res.json({
                    status: ' blog deleted Successfully',
                })
            }
            else {
                res.json({ status: "please enter correct Id" })
            }
        })


    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router