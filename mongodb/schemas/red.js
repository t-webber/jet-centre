const mongoose = require('mongoose')

// ROUGE
const personSchema = new mongoose.Schema({
    email : String,
    firstname : String,
    lastname : String,
    number : Number,
    adress : String,
})

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'user'},
    studies:[
        {type:mongoose.ObjectId, ref:'study'}],
    role: {
        type: mongoose.ObjectId,
        ref: 'role'}
})

const userSchema = new mongoose.Schema({
    person: {type:mongoose.ObjectId, ref:'person'},
    msgbox: {type:mongoose.ObjectId, ref:'msgBox'},
    settings: {type:mongoose.ObjectId, ref:'settings'},
})

const roleSchema = new mongoose.Schema({
    name: String,
    page : {
        type: mongoose.ObjectId,    
        ref: 'page'}
})

const pageSchema = new mongoose.Schema({
    url : String,
    name: String,
    navigable: Boolean
})

const settingsSchema = new mongoose.Schema({
    theme: String,
    notifLvl : Number,
    gui : Boolean
})

module.exports = {personSchema, adminSchema, userSchema, roleSchema, pageSchema, settingsSchema}