// import express from 'express' // this is the old way
const express = require("express");
const shortid = require('shortid');

const server = express();

server.use(express.json()); // teaches express how to read json from body

let users = [
    {name: 'Joe'},
    {name: 'Miriam'},
    {name: 'Jeffrey'}
];

let accounts = [
    { id: shortid.generate(), name: 'Joe', bio: "That's me!"},
    { id: shortid.generate(), name: 'Miriam', bio: "My mother and wife to Jeffrey."},
    { id: shortid.generate(), name: 'Jeffrey', bio: "My father and husband to Miriam"}];

server.get("/hello", (req, res) => {
    res.send("hello web 32");
});

// show a list of users
server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// REMOVE A USER
server.delete('/api/users/:id', (req, res) => {
    const name = req.params.name.toLocaleLowerCase();
    
    users = users.filter(u => u.name.toLocaleLowerCase() !== name)

    res.status(204).end();
})

// ADD A USER
server.post("/api/users", (req, rest) => {
    const user = req.body; // needs express.json() middleware

    users.push(user);

    res.status(201).json(users);
})

// add an account
server.post("/accounts", (req, res) => {
    const account = req.body;

    account.id = shortid.generate();

    accounts.push(account);

    res.status(201).json(accounts);
})

server.get('/accounts', (req, res) => {
    

    res.status(200).json(accounts);
});



const port = 8000;
server.listen(port, () => console.log("server running..."))

