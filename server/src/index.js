// Import express and other required modules
const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

// Import passport middleware
require('./ClientMiddleware/passport-middleware');

// Initialize middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// Initialize Passport
app.use(passport.initialize());

// Import routes
const clientAuthRoutes = require('./routes/ClientAuth');

// Mount routes under different paths
app.use('/api/client', clientAuthRoutes); 

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
