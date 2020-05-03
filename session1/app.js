// const fs = require("fs");

// const db = {
//   users: [
//     {
//       id: 1,
//       email: "email@google.com",
//       password: "password",
//       firstName: "Teo",
//       lastName: "Teo"
//     }
//   ],
//   posts: [
//     {
//       id: 1,
//       title: "New post",
//       description: "gdasgas",
//       userId: 1
//     }
//   ]
// };

// fs.writeFile("./db.json", JSON.stringify(db, null, 2), (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Database init done!");
// });

const fs = require("fs").promises;
const http = require("http");

const start = async () => {
  try {
    let db = await fs.readFile("./db.json");
    db = JSON.parse(db.toString());

    const server = http.createServer((req, res) => {
      if (req.method === "GET" && req.url === "/users") {
        const response = {
          success: true,
          users: db.users
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(response));
        res.end();
      } else if (req.method === "POST" && req.url === "/users") {
        let body = ''

        req.on('data', data => {
          body += data
        })

        req.on('end', async () => {
          body = JSON.parse(body)
          db.users.push(body)

          await fs.writeFile("./db.json", JSON.stringify(db, null, 2));

          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(body));
          res.end();
        })
      } else {
        res.statusCode = 200;
        res.write("Hello word!");
        res.end();
      }
    });

    server.listen(8000, () => console.log("Server listening on port 8000"));
  } catch (error) {
    console.error(error);
  }
};

start();
