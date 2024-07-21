const mongoose = require('mongoose')

// Brun
const versionSchema = new mongoose.Schema({
    authors : {
        type: mongoose.ObjectId,
        ref: 'admin'},
    auditors : {
        type: mongoose.ObjectId,
        ref: 'admin'},
    writeDate : Date,
    auditDate : Date
})

const docSchema = new mongoose.Schema({
    title : String,
    googlePath : String,
    extension : String,
    editable : Boolean,
    state : {
        type: mongoose.ObjectId,    
        ref: 'state'},  
})

const articleModifSchema = new mongoose.Schema({
    articleNb : Number,
    newArticle : {
        type: mongoose.ObjectId,
        ref: 'latexAuditiableContent'}
})

const stateSchema = new mongoose.Schema({
    created : Date,
    wrote : Date, 
    audited : Date,
    sent : Date,
    signed : Date,
    approved : Date,
    bypasses : Date,
    deadline : Date
})

const phaseDescriptionSchema = new mongoose.Schema({
    phase : {type:mongoose.ObjectId, ref:'phase'},
    docType: String,
    methodologie : {type:mongoose.ObjectId, ref:'latexAuditiableContent'}
})

const planningSchema = new mongoose.Schema({
    JEHnb: Number,
    deliverable : {type:mongoose.ObjectId, ref:'deliverable'}
})

module.exports = {versionSchema, docSchema, articleModifSchema, stateSchema, phaseDescriptionSchema, planningSchema}