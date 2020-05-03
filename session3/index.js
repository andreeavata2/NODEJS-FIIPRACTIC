const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const morgan =require('morgan');

const app = express();
const PORT = 8080;

let counter = 0;
let token;

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d'
  });

app.use(morgan('combined'));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [transport]
  });

// app.use((req,res,next) =>{
//     logger.info(new Date().toISOString());
//     // console.log(new Date().toISOString());
//     next();
// });

//body parser
app.use((req, res, next) => {
    
    let body = '';

    req.on('data', (chuck) => {
        body += chunk;
    });

    req.on('end', () => {
        req.body = body;
        console.log(req.body);
        next();
    });
});

app.get('/', (req,res) => {
    res.write(`Counter: ${counter++}`);
    res.end();
});

app.get('/register', (req,res) => {
    token = jwt.sign({ email: 'random@gmail.com' }, 'secret', { expiresIn: 60}); //expiresIn este in secunde

    res.write(`Token: ${token}`);
    res.end();
});

app.get('/login', (req,res) => {
    let email;
    jwt.verify(token, 'secret', function(err, decoded) {
        email= decoded.email
      });
    
    res.write(email);
    res.end();
});

app.get('/api', async(req, res) => {
    let response1;
    try{
        response1 = await axios({
            method: 'get',
            url: 'https://meme-api.herokuapp.com/gimme',
          });
          res.write(JSON.stringify(response1.data.url));
    }catch(error) {
        console.log(error)
        logger.error(JSON.stringify(error));
        res.write(JSON.stringify(error));
    }

    try{
        const response2 = await axios({
            method: 'get',
            url: response1.data.url,
            responseType: 'stream'
          });
          
          response2.data.pipe(fs.createWriteStream('meme.jpg'));

          res.write('-');
    }catch(error) {
        console.group(error)
        logger.error(JSON.stringify(error));
        res.write(JSON.stringify(error));
    }finally{
        res.end();
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});