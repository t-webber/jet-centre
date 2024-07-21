const mongoose = require('mongoose')

// VIOLET 

const msgBoxSchema = new mongoose.Schema({
    appList : [{type:mongoose.ObjectId, ref:'appList'}],
    appDirect : [{type:mongoose.ObjectId, ref:'appMsg'}],
    emails : [{type:mongoose.ObjectId, ref:'mailProvider'}],
    slack: [{type:mongoose.ObjectId, ref:'slackCanal'}]
})

const appListSchema = new mongoose.Schema({
    messages : [{type:mongoose.ObjectId, ref:'appMsg'}],
    members : [{type:mongoose.ObjectId, ref:'person'}]
})

const appMsgSchema = new mongoose.Schema({
    from: {type:mongoose.ObjectId, ref:'person'},
    content : String
})

const mailProviderSchema = new mongoose.Schema({
    IMAP : String,
    SMTP : String,
    content : String
})

const slackCanalSchema = new mongoose.Schema({
    name : String,
    workspace : String,
    token : String,
    content: String
})

const auditCanalSchema = new mongoose.Schema({
    messages: [{type:mongoose.ObjectId, ref:'appMsg'}],
    study: {type:mongoose.ObjectId, ref:'study'}
})

const latexAuditiableContentSchema = new mongoose.Schema({
    content: String,
    message : {type:mongoose.ObjectId, ref:'auditCanal'}
})

module.exports = {msgBoxSchema, appListSchema, appMsgSchema, mailProviderSchema, slackCanalSchema, auditCanalSchema, latexAuditiableContentSchema}