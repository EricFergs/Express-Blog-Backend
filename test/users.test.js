const {test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/BlogSchema')
const User = require('../models/UserSchema')
const mongoose = require('mongoose')

const initialUsers = [
    {
        "username" : "latiaskiwi",
        "name" : "kiwi",
        "password" : "password"
     },
     {
        "username" : "purplemage",
        "name" : "fern",
        "password" : "purple123"
     }
]

describe("testing users", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        console.log('DB Cleared')
    
        const blogObjects = initialUsers.map(user => new User(user))
        const promiseArray = blogObjects.map(user => user.save())
        await Promise.all(promiseArray)
    
    })
    test('Same username are rejected', async () => {
        const user1 = {
            "username" : "latiaskiwi",
            "name" : "woomy",
            "password" : "passowrd"
        }
        await api
            .post('/api/users')
            .send(user1)
            .set('Content-Type','application/json')
            .expect(400)
    })
    test('Missing username is rejected', async () => {
        const user2 = {
            "name" : "stark",
            "password" : "icecream"
        }
        await api
            .post('/api/users')
            .send(user2)
            .set('Content-Type','application/json')
            .expect(400)
    })
    test('Legnth it too small', async () => {
        const user3 = {
            "username" : "no",
            "name" : "chicken",
            "password" : "iamverylong"
        }
        const user4 = {
            "username" : "yesyes",
            "name" : "yesman",
            "password" : "no"
        }
        await api
            .post('/api/users')
            .send(user3)
            .set('Content-Type','application/json')
            .expect(400)
        await api
            .post('/api/users')
            .send(user4)
            .set('Content-Type','application/json')
            .expect(400)
    })
    test('Valid User',async () => {
        const user5 = {
            username : "himmelthehero",
            name: "himmel",
            password : "Iamheroandhandsome"
        }
        await api
            .post('/api/users')
            .send(user5)
            .set('Content-Type', 'application/json')
            .expect(201)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})

