const express = require('express');
const fs = require('fs');

const middlewares = require('./middlewares');

const app = express();
const PORT = 8080;

app.use(middlewares.logMiddleware);
app.use(middlewares.bodyMiddleware);

app.get('/', (req, res) => {
    const fileContent = fs.readFileSync('./data.json');
    res.write(fileContent);
    res.end();
});

app.post('/', (req, res) => {
    const data = req.body;
    fs.writeFileSync('data.json', data);

    res.write('Success!');
    res.end();
});

app.delete('/', (req, res) => {
    try {
        fs.unlinkSync('data.json');
        res.write('Success!');
    } catch (error) {
        res.write('Error! File not exist');
    }

    res.end();
});

app.put('/', (req, res) => {
    const newData = req.body;
    const fileContent = fs.readFileSync('data.json');

    let jsonData;
    try{
        jsonData =JSON.parse(fileContent);
        inputJsonData = JSON.parse(newData);

        for(const key of Object.keys(inputJsonData)) {
            jsonData[key] = inputJsonData[key];
        }

        fs.writeFileSync('data.json', JSON.stringify(jsonData));
    }catch (error) {
        res.write('Error!');
    }finally{
        res.end();
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});