const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

// Routes
const postsRoutes = require('./routes/api/post')

const app = express();

// BodyParser middleware
app.use(express.json());

// Connect to mongoDB
mongoose.connect(MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.log(err))

     
// User routes
app.use('/api/post', postsRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))