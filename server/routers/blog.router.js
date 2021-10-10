const { Router } = require('express')
const { createBlog, updateBlog, deleteBlog, getBlogs } = require('../controllers/blog.controller')
const router = Router()

router.get('/all', getBlogs)
router.post('/create', createBlog)
router.patch('/update/:id', updateBlog)
router.delete('/delete/:id', deleteBlog)

module.exports = router