const mongoose = require('mongoose')
// GOLDEN

const MRISchema = new mongoose.Schema({
    paycheck_under : Number,
    paycheck_over : Number,
    difficulty : Number,
    introduction : String,
    context : String,
    schedule : String,
    skills : String,
    study : {type:mongoose.ObjectId, ref:'study'}
})

const formMRISchema = new mongoose.Schema({
    experience : String,
    knowledge : String,
    ideas : String, 
    JEExperience : Number,
    mri : {type:mongoose.ObjectId, ref:'MRI'}
})

const formInterviewSchema = new mongoose.Schema({
    available : Boolean,
    approche : String,
    courses : String,
    STAR_S : String,
    STAR_T : String,
    STAR_A : String,
    STAR_R : String,
    motivation : String,
    cdpRequirements : String,
    questions : String
})

const studyAsigneeSchema = new mongoose.Schema({
    assignee : {type:mongoose.ObjectId, ref:'assignee'},
    formInterview : {type:mongoose.ObjectId, ref:'formInterview'},
    formMRI : {type:mongoose.ObjectId, ref:'formMRI'},
    selectionNotes: String,
    taken: Boolean,
    study : {type:mongoose.ObjectId, ref:'study'}
})

const assigneeSchema = new mongoose.Schema({
    studies : [{type:mongoose.ObjectId, ref:'study'}],
    tried: Boolean,
    docs : {type:mongoose.ObjectId, ref:'assigneeDocs'},
    info : {type:mongoose.ObjectId, ref:'assigneeInfo'},
    person : {type:mongoose.ObjectId, ref:'person'}
})

const assigneeDocsSchema = new mongoose.Schema({
    cni : {type:mongoose.ObjectId, ref:'doc'},
    vital : {type:mongoose.ObjectId, ref:'doc'},
    studentCard : {type:mongoose.ObjectId, ref:'doc'},
    assignee : {type:mongoose.ObjectId, ref:'assignee'}
})

const assigneeInfoSchema = new mongoose.Schema({
    age: Number,
    promo : Number,
    boursier : Boolean,
    oldJet : Boolean,
    assignee : {type:mongoose.ObjectId, ref:'assignee'}
})


module.exports = {MRISchema, formMRISchema, formInterviewSchema, studyAsigneeSchema, assigneeSchema, assigneeDocsSchema, assigneeInfoSchema}