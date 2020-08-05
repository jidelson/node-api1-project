// import express from 'express' // this is the old way
const express = require("express");
const shortid = require('shortid');

const server = express();

server.use(express.json()); // teaches express how to read json from body

// let users = [
//     {name: 'Joe'},
//     {name: 'Miriam'},
//     {name: 'Jeffrey'}
// ];

let users = [
    { id: shortid.generate(), name: 'Joe', bio: "That's me!"},
    { id: shortid.generate(), name: 'Miriam', bio: "My mother and wife to Jeffrey."},
    { id: shortid.generate(), name: 'Jeffrey', bio: "My father and husband to Miriam"}];


// show a list of users
server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET USER BY ID
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find(u => u.id === id)
    if (!user) {
        return(res.status(404).json({errorMessage: 'The users information could not be retrieved'}))
    } else {
        return(res.json(user))
    }
})


// REMOVE A USER
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params

    const name = req.params.name.toLocaleLowerCase();
    
    users = users.filter(u => u.name.toLocaleLowerCase() !== name)

    res.status(204).end();
})

// ADD A USER
server.post("/api/users", (req, res) => {
    const user = req.body; // needs express.json() middleware
    user.id = shortid.generate();

    if(!user.name || !user.bio){
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
}

    else{
        users.push(user)
        res.status(201).json(user)
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

