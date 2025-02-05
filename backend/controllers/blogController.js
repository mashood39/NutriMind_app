const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body
        const imageUrl = req.file.path

        const newBlog = new Blog({
            title,
            content,
            image: imageUrl,
            createdAt: new Date(),
        });
        await newBlog.save();
        res.status(200).json({ message: 'Blog added succesfully' })
    } catch (error) {
        console.log("error in saving the blog", error.message)
        res.status(500).json({ message: 'error in saving the blog' })
    }
}

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

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found')
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error in saving the blog.' });
    }
}

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Blog deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: 'error in deleting the blog.' })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        let updatedData = { ...req.body }
        if (req.file) {
            updatedData.image = req.file.path
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ message: 'blog updated succesfully', updatedBlog })
    } catch (error) {
        console.error("error in updating the blog", error.message)
        res.status(500).json({ message: "error in updating the blog" })
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}