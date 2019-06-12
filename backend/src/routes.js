const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload')

const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/',(req,res)=>{
    return res.send('Rota raiz');
})

routes.get('/posts',PostController.index)
routes.get('/posts/:id',PostController.show)
routes.delete('/posts/:id',PostController.delete)
routes.post('/posts',upload.single('image'),PostController.store)
routes.post('/posts/:id/like',LikeController.store)

module.exports = routes;