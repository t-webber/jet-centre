const mongoose = require('mongoose')

// BLEU

const companyTypeSchema=new mongoose.Schema({
        nbEmployees : Number,
        size : String,
        domains : String
    });

const companySchema = new mongoose.Schema({
    address : String,
	members : [ {
        type: mongoose.ObjectId,
        ref: 'client'
      }],
	type : {
        type: mongoose.ObjectId,
        ref: 'companyType'}
})

const clientSchema = new mongoose.Schema({
    name : String,
    company : {
        type: mongoose.ObjectId,
        ref: 'company'},
    studies : [{
        type: mongoose.ObjectId,
        ref: 'study'}],
    person : {
        type: mongoose.ObjectId,
        ref: 'person'}
})

const studyClientSchema = new mongoose.Schema({
    satisfaction : {
        type: mongoose.ObjectId,
        ref: 'satisfaction'},
    client : {
        type: mongoose.ObjectId,
        ref: 'client'},
    study : {
        type: mongoose.ObjectId,
        ref: 'study'}
})

const satisfactionSchema = new mongoose.Schema({
    study : {
        type: mongoose.ObjectId,
        ref: 'study'},
    publish : Boolean,
    howKnowUs: String,
    whyUs: String,
    satisfactionObjectives: Number,
    easyness: Number,
    timelaps: Number,
    recommendUs: Number
})

module.exports = {companyTypeSchema, companySchema, clientSchema, studyClientSchema, satisfactionSchema}