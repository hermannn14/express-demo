// Require express
const express = require("express");

// create an express server from the express function above.
const server = express();

//Tell our server how to process different payloads
server.use(express.json());

// console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

// Make the server listen on a port (on our)
server.listen(PORT, () => {
    console.log("Server listening...");
});

//CRUD
//CREATE => POST
//UPDATE => PUT
//DELETE => DELETE

const destinations = []

const students = {
    dao: {
        name: "Dao",
        interests: ["tacos"],
        city: "paris",
    },
    herman: {
        name: "Herman",
        interests: ["soccer"],
        city: "yaounde",
    },
    will: {
        name: "Will",
        interests: ["camarro", "frontier", "wrangler"],
        city: "Detroit",
    }
};

server.get("/students/name/:name", (req, res) => {
    const { name} = req.params;

    if (name) {
        const student = student[name.toLowerCase()];

        if(student) {
            return res.send(student);
        }

        return res
        .status(404)
        .send({error: `Student by the name of ${name} not found`});
    }
    ;
    server.get("/students/city/:city", (req, res) => {
        const {city} = req.params;

        if (city) {
            const filteredStudents = Object.values(students).filter (
                (student) => student.city.toLowerCase() === city.toLowerCase()
            );

            return res.send(filteredStudents);
        }
    });
    server.get("/students/interest/:interest", (req, res) => {
        const {interest} = req.params;

        if (interest) {
            const filteredStudents = Object.values(students).filter (
                student.interests.includes(interest.toLowerCase())
            );

            return res.send(filteredStudents);
        }
    });


/*
    let filteredStudents = Object.values(students);

    if (interest) {
        filteredStudents = filteredStudents.filter((student) => 
        student.interests.includes(interest.toLocaleLowerCase())
        );
    }

    if (city) {
        filteredStudents = filteredStudents.filter (
            (student) => student.city.toLowerCase() === city.toLowerCase()
        );
    }

    return res.send(filteredStudents);
    */
});

//CREATE => POST
//POST /destinations
// What is a destination and what makes a destinaton record?
/*
    - destination name (REQUIRED)
    - location (REQUIRED)
    - photo
    - description
*/
server.post("/destinations", (req,res) => {
    // ONLY grab what I need
    const {destination, location, photo, description} = req.body;

    // Validate that I got what I expected (i.e destination & location are BOTH present and not empty strings)
    if(
        !destination || 
        !location || destination.length === 0 || 
        location.length === 0
    ) {
        return res
            .status(400)
            .send({error: "Destination AND location are BOTH required"})
    }

    const newDest = {
        destination,
        location,
        photo: photo && photo.length !== 0 ? photo : "papaoutai",
        description: description && description.length !== 0 ? description : "",
    };

    destinations.push(newDest);

    res.redirect(303, "/destinations"); // Go to GET /destinations
});

// GET /destinations
server.get("/destinations", (req, res)=> {
    res.send(destinations);
});