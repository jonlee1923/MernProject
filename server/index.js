const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();

//Connect to database
connectDB(); //will print cyan line in terminal

app.use(cors()); //need this to fix the cors policy error -> This error occurs when a script on your website/web app attempts to make a request to a resource that isn't configured to accept requests coming from code that doesn't come from the same (sub)domain, thus violating the Same-Origin policy.

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === 'development', //use graphiql only in development
}));

app.listen(port, console.log(`Server running on port ${port}`));