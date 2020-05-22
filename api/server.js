const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan =  require('morgan')
const server = express();

const { authenticate } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');


server.use(express.json(),helmet(),cors(),morgan('short'));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate(), jokesRouter);

server.get('/', (req,res) => {
    res.json( { api: 'Welcome to the users API!' })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'Error processing the request.' })
})

module.exports = server;
