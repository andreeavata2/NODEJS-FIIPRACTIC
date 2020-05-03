const express = require("express");
const fs = require("fs");

const app = express();

app.post('/', (req, res) => {
    let file = ''

    req.on('data', data => {
        file += data.toString();
    });

    req.on("end", () => {
        file = file
            .split("\r\n")
            .filter((el) => el)
            .slice(1,-1);
        
        const metadata = file[0];

        file = file.slice(2)[0];

        console.log(file);

        const filename = metadata
            .match(/filename=\"[A-Za-z.]+\"/g)[0]
            .split('"')[1];
        console.log(filename);

        fs.writeFileSync(`new-${filename}`, file);        
    })
})

app.listen(3000, () => console.log("server started"));
