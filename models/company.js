// require
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT
// const Fruit = require('./models/fruit');
// const ejs = require('ejs');
// const methodOverride = require('method-override')

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {type: String, required:true},
  logo:{type: String, required:true},
  address:{type: String, required:true},
  city:{type: String, required:true},
  telephone:{type: String, required:true},
  createdAt:{type: Date, required:true},
  updatedAt:{type: Date, required:false},
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
})
const Company = mongoose.model('Company', companySchema)
module.exports = Company;