const mongoose = require('mongoose')

// VERT
const studySchema = new mongoose.Schema({
    cdp : [{
        type: mongoose.ObjectId,
        ref: 'admin'
    }],
	info : {type:mongoose.ObjectId, ref:'studyInfo'},
	client : [{type:mongoose.ObjectId, ref:'studyClient'}],
	progress : {type:mongoose.ObjectId, ref:'studyProgress'},
	post : {type:mongoose.ObjectId, ref:'studyPost'},
	auditors : [{type:mongoose.ObjectId, ref:'admin'}]
})

const studyProgressSchema = new mongoose.Schema({
    phase: Number,
    preEtude: Boolean,
    ended: Boolean,
    tripartiteMeeting: Boolean,
    assigneePaid: Boolean,
    companyFactored: Boolean,
    assigneePapers: Boolean
})

const studyInfoSchema = new mongoose.Schema({
    domain : {type:mongoose.ObjectId, ref:'domain'},
    title: String,
    deliverable : {type:mongoose.ObjectId, ref:'deliverable'},
    phases : [{type:mongoose.ObjectId, ref:'phases'}],
    assignees : [{type:mongoose.ObjectId, ref:'studyAssignee'}],
    mri : {type:mongoose.ObjectId, ref:'mri'},
    applicationFee : Boolean,
    docs : {type:mongoose.ObjectId, ref:'studyDoc'},
    type : Number,
    study: {type:mongoose.ObjectId, ref:'study'}
})

const studyDocsSchema = new mongoose.Schema({
    study: {type:mongoose.ObjectId, ref:'study'},
    ce : {type:mongoose.ObjectId, ref:'doc'},
    cc : {type:mongoose.ObjectId, ref:'doc'},
    bc : {type:mongoose.ObjectId, ref:'doc'},
    rm : {type:mongoose.ObjectId, ref:'doc'},
    ace : {type:mongoose.ObjectId, ref:'doc'},
    arm : {type:mongoose.ObjectId, ref:'doc'},
    acc : {type:mongoose.ObjectId, ref:'doc'},
    bcr : {type:mongoose.ObjectId, ref:'doc'},
    pvri : {type:mongoose.ObjectId, ref:'doc'},
    pvrf : {type:mongoose.ObjectId, ref:'doc'},
    bv : {type:mongoose.ObjectId, ref:'doc'},
    cconf : {type:mongoose.ObjectId, ref:'doc'}
})

const phaseSchema = new mongoose.Schema({
    jeh : {type:mongoose.ObjectId, ref:'jeh'},
    unitprice : Number,
    study : {type:mongoose.ObjectId, ref:'study'},
    start : Date,
    end : Date
})

const jehSchema = new mongoose.Schema({
    phase : {type:mongoose.ObjectId, ref:'phase'},
    deliverable : String
})

const deliverableSchema = new mongoose.Schema({
    content: String,
    given : Boolean,
    done : Boolean
})

const domainSchema = new mongoose.Schema({
    name : String,
    studies : [{type:mongoose.ObjectId, ref:'study'}]
})

module.exports = {studySchema, studyProgressSchema, studyInfoSchema, studyDocsSchema, phaseSchema, jehSchema, deliverableSchema, domainSchema}