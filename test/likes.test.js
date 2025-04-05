const {test, describe} = require('node:test')
const assert = require('node:assert')
const likesCount = require('../utils/list_helper').likesCount

describe('likesCountss', () =>{
    const blog = {author : "Hello boy",
                  title : "Sunday chill",
                  date :"today",
                  likes : 155
    }
    test('Blog with 155', () => {
        assert.strictEqual(likesCount(blog),155)
    })
    const blog2 = {author : "Hello boy",
        title : "Sunday chill",
        date :"today",
        likes : 0
    }
    test('Blog with 0', () => {
        assert.strictEqual(likesCount(blog2),0)
    })

})