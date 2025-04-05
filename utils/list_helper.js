const dummy = (blogs) => {
    return 1
  }

const likesCount = (blogs) => {
    count = blogs.likes
    return count
}

const favoriteBlog = (blogs) => {
    ans = null
    max = -Infinity
    blogs.forEach(blog => {
        if(blog.likes > max){
            ans = blog
            max = blog.likes
        }
    });
    return ans
}

const mostBlog = (blogs) => {
    ans = { author : "none", blogs : 0}
    const hashMap = new Map();
    blogs.forEach(blog =>{
        if(blog.author in hashMap){
            hashMap[blog.author] += 1
            if (hashMap[blog.author] > ans.blogs){
                ans = { author : blog.author, blogs : hashMap[blog.author]}
            }
        }
        else{
            hashMap[blog.author] = 1
            if (1 > ans.blogs){
                ans = { author : blog.author, blogs : hashMap[blog.author]}
            }
        }}
    )
    return ans
}

const mostLikes = (blogs) => {
    ans = {author : "none", likes : 0}
    const hashMap = new Map()
    blogs.forEach(blog =>{
        a = blog.author
        if(a in hashMap){
            hashMap[a] += blog.likes
          
            if (hashMap[a] > ans.likes){
           
                ans = { author : a, likes: hashMap[a]}
            }
        }
        else{
            hashMap[a] = blog.likes
            if (blog.likes > ans.likes){
                ans = { author : a, likes: blog.likes }
            }
        }

    })
    return ans
}
  module.exports = {
    dummy,
    likesCount,
    favoriteBlog,
    mostBlog,
    mostLikes
  }