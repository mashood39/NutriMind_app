const Blog = require("../models/blogModel");

//create a blog
const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            image: `/uploads/blogs/${req.file.filename}`,
        })
        await newBlog.save();
        res.status(200).json({ message: 'Blog added succesfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error in saving the blog' })
    }
}

//get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: - 1 });
        res.status(200).json({ blogs })
    }
    catch (error) {
        console.error("error in fetching titles", error);
        res.status(500).json({ message: "error fetching titles from database", error: error.message })
    }
}

// get a single blog by id.
const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found')
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error in saving the blog.' });
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog
}