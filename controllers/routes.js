const blogRouter = require('express').Router()
const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user')
    response.json(allBlogs)
  })


blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
      'title' : body.title,
      'author' : user.name,
      'url' : body.url,
      'user' : user.id,
      "likes" : body.likes
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    return response.status(201).json(result)
})  

blogRouter.delete('/:id',async (request, response) => {
   const id = request.params.id
   const user = request.user
   const deletedDoc = await Blog.findById(id)
   if(!deletedDoc){
      return response.status(404).json({error:'Blog not found'})
   }
   else if(deletedDoc.user.toString() !== user.id.toString()){
      return response.status(401).json({error: "Unauthorized account"})
   }

   return response.status(200).json({message :"Succcesful Deletion"})
})

blogRouter.put('/',async (request, response) => {
  const {id, likes} = request.body
  if (!id || likes === undefined){
    return response.status(400).json({error:"ID and likes are required"})
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, {$set: {likes}}, {new: true})

  if(!updatedBlog){
    return response.status(404).json({message:"User not found"})
  }

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter