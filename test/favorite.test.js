const {test, describe} = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favoriteBlog',() => {
    const blog = {author : "Riki Squeeze",
        title : "Squeezer Guide",
        date :"3/25/22",
        likes : 5208
    }
    const blog2 = {author : "Riki Squeeze",
        title : "Sunday chill",
        date :"today",
        likes : 0
    }
    const blog3 = {author : "Hello3 boy",
        title : "Sunday chill",
        date :"today",
        likes : 188
    }
    allBlogs = [blog,blog2,blog3]
    test('FavBlog',() => {
        assert.deepStrictEqual(favoriteBlog(allBlogs),blog)
    })
})