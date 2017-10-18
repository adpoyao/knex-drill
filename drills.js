'use strict';
require('dotenv').config();
const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);
const Treeize = require('treeize');
const tree = new Treeize();

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 

// knex
//   .select()
//   .table('restaurants') //.from
//   .then(result => console.log(result));

// knex
//   .select()
//   .table('restaurants')
//   .where('cuisine', 'Italian') //{'cuisine': 'Italian'}
//   .then(result => console.log(result));

// knex
//   .select('id', 'name')
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .limit(10)
//   .then(result => console.log(result));

// knex('restaurants')
//   .count()
//   .where('cuisine','Thai')
//   .then(result => console.log(result));

// knex('restaurants')
//   .count()
//   .then(result => console.log(result));

// knex('restaurants')
//   .count()
//   .where({cuisine: 'Thai', address_zipcode: '11372'})
//   .then(result => console.log(result));

// knex('restaurants')
//   .select('id', 'name', 'address_zipcode')
//   .whereIn('address_zipcode', [10012, 10013, 10014])
//   .where({cuisine: 'Italian'})
//   .orderBy('name', 'asc')
//   .limit(5)
//   .then(result => console.log(result));

// knex('restaurants')
//   .insert({name: 'Byte Cafe', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '123', address_street: 'Atlantic Avenue',address_zipcode: '11231'})
//   .returning(['id','name'])
//   .then(result => console.log(result));

// knex('restaurants')
//   .insert([
//     {name: 'Cafe1', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '124', address_street: 'Atlantic Avenue',address_zipcode: '11231'},
//     {name: 'Cafe2', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '125', address_street: 'Atlantic Avenue',address_zipcode: '11231'},
//     {name: 'Cafe3', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '126', address_street: 'Atlantic Avenue',address_zipcode: '11231'}])
//   .returning(['id','name'])
//   .then(result => console.log(result));

// knex('restaurants')
//   .where('nyc_restaurant_id', '30191841')
//   .update('name', 'DJ Reynolds Pub and Restaurant')
//   .returning('name')
//   .then(result => console.log(result));

// knex('grades')
//   .where('id', 10)
//   .del()
//   .then(result => console.log(result));

// knex('restaurants')
//   .where('id', 22)
//   .del()
//   .then(result => console.log(result));

// knex.select('restaurants.id', 'name', 'grades.id as gradeId', 'grade')
//   .from('restaurants')
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .then(result => console.log(result));

// OLD ANSWER THAT DOESN'T WORK
//  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//   .from('restaurants')
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .where('restaurants.id', '16')
//   .orderBy('date', 'asc')
//   .limit(100)
//   .then(results => {
//     tree.grow(results);
//     console.log(tree.getData());
//   });


knex.select('restaurants.id as id', 'name', 'cuisine', 'borough', 'grades.id as restaurant:grades:id', 'grade as restaurant:grades:grade', 'score as restaurant:scores')
  .from('restaurants')
  .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
  .where('restaurants.id', '16')
  .orderBy('date', 'asc')
  .limit(100)
  .then(results => {
    //console.log(results.map(item => item));
    tree.grow(results);
    console.log(JSON.stringify(tree.getData(), null, 2));
  });

// tree.grow([
//   { 'foo': 'bar', 'logs:a': 1 },
//   { 'foo': 'bar', 'logs:a': 2 },
//   { 'foo': 'baz', 'logs:a': 3 },
// ]);


//HYDRATION METHOD
// const hydrated = {};
// results
//   .forEach(row => {
//     const {id, name, cuisine, borough,} = row;
//     if(!(id in hydrated)){
//       hydrated[id] = {
//         name,
//         cuisine,
//         borough,
//         grades: []
//       }; 
//     }
//     hydrated[row.id].grades.push({gradeId: row.id, grade: row.grade});
//   });
//   console.log(JSON.stringify(hydrated, null, 2));
// });

// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});