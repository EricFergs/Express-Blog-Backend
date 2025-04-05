const {test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/BlogSchema')
const mongoose = require('mongoose')


const initialBlogs = [
    {
        "title" : "Eating Steak",
        "author": "Stark",
        "url" : "www.steak.com",
        "likes" : 34
     },
     {
        "title":"Cooking Steak",
        "author":"Frieren",
        "url":"Zoltark",
        "likes":88
     }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('DB Cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('There are 2 blogs', async () => {
    const getBlogs = await api.get('/api/blogs')
    assert.strictEqual(getBlogs.body.length, 2)
})

test('Return properties are valid', async () => {
    const newBlog = ({"title" : "Eating Steak",
                                "author": "Stark",
                                "url" : "www.steak.com",
                                "likes" : 34})
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Content-Type','application/json')
        .expect(201)
    assert.ok(response.body.id,"this is an error message, does not contain id property")
    
    const blogs = await Blog.find({})
    assert.strictEqual(blogs.length, initialBlogs.length + 1)
    
})

test("Likes to default to 0",async () => {
    const newBlog = ({"title" : "I have no likes",
                        "author": "Sein",
                        "url" : "Plz"})
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Content-Type','application/json')
        .expect(201)
    
    console.log(response.body)
    assert.ok('likes' in response.body,"likes property should exist")
    assert.strictEqual(response.body.likes,0,"likes should default to 0")
})

test("400 bad request when missing title or url", async () => {
    const noUrl = ({"title" : "I have no likes",
                    "author": "Sein",
                    "likes" : 7})
    const noTitle = ({ "author": "Sein",
                    "url" : "www.google.com",
                    "likes" : 7})
    await api
        .post('/api/blogs')
        .send(noUrl)
        .set('Content-Type','application/json')
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(noTitle)
        .set('Content-Type','application/json')
        .expect(400)
})

test("the deletion is successful", async () => {
    const blogs = await Blog.find({})
    const id = blogs[0].toJSON().id
    await api
        .delete(`/api/blogs/${id}`)
        .expect(200)
    
    const newBlogs = await Blog.find({})
    assert.strictEqual(newBlogs.length + 1, blogs.length)
})

test.only("updating likes is successful",async () => {
    const blogs = await Blog.find({})
    const firstBlog = blogs[0].toJSON()
    const id = firstBlog.id
    const likes = firstBlog.likes
    const updates = {id : id, likes: likes + 1}
    await api
        .put('/api/blogs')
        .send(updates)
        .expect(200)
    const updatedBlog = await Blog.findById(id)
    assert.strictEqual(likes + 1, updatedBlog.likes)
    
})
//npm run test:only test/routes.test.js
after(async () => {
    await mongoose.connection.close()
})