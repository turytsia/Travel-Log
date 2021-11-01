const { Router } = require('express')
const { createBlog, updateBlog, deleteBlog, getBlogs, getBlog, commentBlog, likeBlog } = require('../controllers/blog.controller')
const router = Router()
const { upload } = require('../multerInit.js')
    //middle
const auth = require('../middleware/auth')
router.get('/all', getBlogs)
router.get('/:id', getBlog)
router.get('/:id/like', auth, likeBlog)
router.post('/:id/comment', auth, commentBlog)
router.post('/create', [auth, upload.array('image', 10)], createBlog)
router.patch('/update/:id', auth, updateBlog)
router.delete('/delete/:id', auth, deleteBlog)

module.exports = router