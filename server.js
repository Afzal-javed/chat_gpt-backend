const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoute")
const openaiRoutes = require("./routes/openaiRoutes")
//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(errorHandler);
app.use(authRoutes)
app.use(openaiRoutes)


const PORT = process.env.PORT || 8000;
app.listen(PORT || 8000, () => {
    console.log(`server is running in ${process.env.DEV_MODE} mode on ${PORT}`.bgWhite.black);
})