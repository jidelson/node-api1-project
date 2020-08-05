// import express from 'express' // this is the old way
const express = require("express");
const shortid = require('shortid');

const server = express();

server.use(express.json()); // teaches express how to read json from body

let users = [
    { id: shortid.generate(), name: 'Joe', bio: "That's me!"},
    { id: shortid.generate(), name: 'Miriam', bio: "My mother and wife to Jeffrey."},
    { id: shortid.generate(), name: 'Jeffrey', bio: "My father and husband to Miriam"}];

// ADD A USER
server.post("/api/users", (req, res) => {
    const user = req.body; // needs express.json() middleware
    user.id = shortid.generate();

    if(!user.name || !user.bio){
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
}
    else if (!user){
    res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
}
    else{
        users.push(user)
        res.status(201).json(user)
    }    
})

// show a list of users
server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET USER BY ID
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find(u => u.id === id)
    if (!user.id) {
        (res.status(404).json({ message: "The user with the specified ID does not exist." }))
    } else if (!user) {
        res.status(500).json({errorMessage: 'The users information could not be retrieved'})
    }
    else {
        return(res.json(user))
    }
})

// REMOVE A USER
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params

    const deleted = users.find((u) => u.id !== id)
    
    if(!deleted){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } 
    
    else {
        try{
            users.filter((user) => user.id !== id)
            res.status(200).end();
        }
        catch{
            res.status(500).json({errorMessage: "The user could not be removed"})
        }
    }


})



// PUT
server.put("/api/users/:id", (req, res) => {
    const editUser= users.find((u) => u.id !== id)
    const user = req.body;

    if(!editUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else if(!editUser.name || !editUser.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else if(){

    }
    else{
        users.push(user)
        res.status(200).json(user)
    }
})







// // add an account
// server.post("/accounts", (req, res) => {
//     const account = req.body;

//     account.id = shortid.generate();

//     accounts.push(account);

//     res.status(201).json(accounts);
// })

// server.get('/accounts', (req, res) => {
    
//     res.status(200).json(accounts);
// });



const port = 8000;
server.listen(port, () => console.log("server running..."))

