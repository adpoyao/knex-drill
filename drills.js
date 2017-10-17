'use strict';
require('dotenv').config();
const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

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

// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});