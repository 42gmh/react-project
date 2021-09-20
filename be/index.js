'use strict'

const express = require('express');
var cors = require('cors');
var morgan = require('morgan');

require('dotenv').config();

const fs = require('fs');

let rawdata = fs.readFileSync('tao.json');
let tao = JSON.parse(rawdata);

// console.log(tao);

const expressServer = express();
expressServer.use(express.urlencoded({ extended: true }));
expressServer.use(express.json());
expressServer.use(cors());

expressServer.use(morgan('common'));

expressServer.get("/api/tao/v1/booksummary", (req, res) => {

    const taoSummary = {
        title: tao.title,
        attributions: tao.attributions,
        books: []
    }

    const books = tao.books.map((element) => {
        return {
            title: element.title,
            booknum: element.booknum,
            epigraph: element.epigraph
        }
    });

    taoSummary.books = books;

    res.send(taoSummary);
});

expressServer.get("/api/tao/v1/book/:id", (req, res) => {
    res.send(tao.books[req.params.id - 1]);
});
  
// set port, listen for requests
expressServer.listen(process.env.MY_PORT, () => {
    console.log(`Server is running on port ${process.env.MY_PORT}.`);
});