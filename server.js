'use strict';
// require('dotenv').config(); //makes it easy to retrieve variable from .env
const express = require('express');
const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const app = express();

app.get('/restaurants', (req, res) => {
  knex.select('id', 'name', 'cuisine', 'borough', 'address_building_number', 'address_street')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
  knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeid', 'grade', 'date as inspectionDate', 'score')
    .select(knex.raw('CONCAT(address_building_number, \' \', address_street, \' \', address_zipcode ) as address'))
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
    .orderBy('date', 'desc')
    .then(results => res.json(results));
});

// app.get('/restaurants/:id', (req, res) => {
//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//     .from('restaurants')
//     .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//     .where('restaurants.id', req.params.id)    
//     .orderBy('date', 'desc')
//     .limit(10)
//     .then(results => res.json(results));
// });

app.post('/restaurants', jsonParser, (req, res) => {
  const requiredFields = ['name', 'cuisine', 'borough', 'grades'];
  for(let i=0; i<requiredFields.length; i++) {
    let field = requiredFields[i];
    if(!(field in req.body)) {
      res.status(400).send('Missing Fields');
    }
  }
  const {name, cuisine, borough, grade} = req.body;
  knex
    .insert([{name, cuisine, borough, grade}])
    .into('restaurants')
    .returning([name, cuisine, borough]);
  // .then(result => console.log(result));
  // res.status(201).send('Done!').end();
});

app.listen(PORT);
