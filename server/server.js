const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)

app.listen(process.env.PORT, (req, res) => {
    console.log('Server running on port:', process.env.PORT);
})