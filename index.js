// Require express
const express = require("express");

// create an express server from the express function above.
const server = express();

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

// Make the server listen on a port (on our)
server.listen(PORT, () => {
    console.log("Server listening...");
});

// GET /herman
server.get("/herman", (req, res)=> {
    res.send("<h1> Hi Herman! </p>");
});