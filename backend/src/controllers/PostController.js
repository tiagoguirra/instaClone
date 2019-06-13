const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')


module.exports = {
    async index(req,res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts)
    },
    async show(req,res){
        const post = await Post.findById(req.params.id)
        if(!post)
            return res.status(404).json({error:"Post not found"})
            
        return res.json(post)
    },
    async store(req,res){        
        const {author,place,description,hashtags} = req.body;
        const {filename:image} = req.file;        
        const [name] = image.split('.')
        const fileName = `${name}.jpg`
        const filePath = path.resolve(req.file.destination,'resized',fileName)
        
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality:70})
        .toFile(filePath)
        fs.unlinkSync(req.file.path)
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image:fileName,
            imagePath:filePath
        })
        req.io.emit('post',post)
        return res.json(post)
    },
    async delete(req,res){
        const post = await Post.findById(req.params.id)
        if(!post)
            return res.status(404).json({error:"Post not found"})

            
        if (post.imagePath!=null && fs.existsSync(post.imagePath)) {
            fs.unlinkSync(post.imagePath)
        }
        await post.remove()
        return res.status(200).json({ok:true})
    }
}