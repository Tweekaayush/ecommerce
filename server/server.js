const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
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

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)

// Error Middleware

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, (req, res) => {
    console.log('Server running on port:', process.env.PORT);
})