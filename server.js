const express = require("express");
const fs = require("fs")
const path = require("path");
let num = 0;
// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000 //|| process.env.PORT
let db = require("./db/db.json")
// console.log(db)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))



// Routes =============================================================
app.get("/api/notes", function (req, res) {
    res.json(db);
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log(req)
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = num++;
    console.log(newNote);
    db.push(newNote)
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(db), function (err) {
        if (err) 
        throw err;
    })
    res.json(newNote);
});


app.delete('/api/notes/:id', function (req, res) {
    let retrievedIDNumber = parseInt(req.params.id);
    console.log(retrievedIDNumber)
    for (let i = 0; i < db.length; i++) {
        if (retrievedIDNumber === db[i].id) {
        db.splice(i, 1);
        }
    }
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(db), function (err) {
        if (err) 
        throw err;
       
    })
    res.json(db);
});




app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



// DELETE: look up javascript splice