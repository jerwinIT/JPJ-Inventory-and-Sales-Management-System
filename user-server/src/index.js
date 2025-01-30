// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { PORT, USER_URL } = require('./constants');

// Import passport middleware
require('./UserMiddleware/passport-middleware');

const app = express();

// Initialize middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({ 
    origin: USER_URL, 
    credentials: true 
}));

// Initialize Passport
app.use(passport.initialize());

// Import routes
const userAuthRoutes = require('./routes/UserAuth');

// Mount routes under different paths
app.use('/api/user', userAuthRoutes); 

// Start the server
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

appStart();
