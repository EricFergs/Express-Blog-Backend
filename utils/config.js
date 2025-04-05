require('dotenv').config()

const mongoURI = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGO_URI
    : process.env.mongoURI

console.log(process.env.NODE_ENV,mongoURI)

module.exports = mongoURI