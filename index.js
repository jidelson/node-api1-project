// import express from 'express' // this is the old way
const express = require("express");
const shortid = require('shortid');

const server = express();

server.use(express.json()); // teaches express how to read json from body

let users = [
    { id: shortid.generate(), name: 'Joe', bio: "That's me!" },
    { id: shortid.generate(), name: 'Miriam', bio: "My mother and wife to Jeffrey." },
    { id: shortid.generate(), name: 'Jeffrey', bio: "My father and husband to Miriam" }];

// ADD A USER
server.post("/api/users", (req, res) => {
    const user = req.body; // needs express.json() middleware

    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else if (!user) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
    else {
        user.id = shortid.generate();
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
        res.status(500).json({ errorMessage: 'The users information could not be retrieved' })
    }
    else {
        return (res.status(200).json(user))
    }
})

// REMOVE A USER
server.delete('/api/users/:id', (req, res) => {
    // try{
    //   const deletedUser = users.filter( u => u.id === req.params.id);
    //   if(deletedUser.length > 0){
    //     users = users.filter(u => u.id !== req.params.id)
    //     res.status(200).json(deletedUser)
    //   } else {
    //     res.status(404).json({ message: "The user with the specified ID does not exist." })
    //   }
    // } catch{
    //   res.status(500).json({ errorMessage: "The user could not be removed" })
    // }
    const newUsers = users.filter(user => user.id !== req.params.id);
    if (users.length >= newUsers) {
        res.status(402).json({ message: 'The user with the provided id does not exist' });
    } else {
        users = newUsers;
        res.status(200).json(users);
    }
})

// PUT
server.put("/api/users/:id", (req, res) => {
    try {
        const user = users.find(u => u.id === req.params.id);
        const newUser = req.body;

        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        else if (!newUser.name || !newUser.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
        else {
            users = users.map(user => user.id === req.params.id ? newUser : user);
            res.status(200).json(users);
        }
    }
    catch{
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})


const port = 8000;
server.listen(port, () => console.log("server running..."))