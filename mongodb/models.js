const mongoose = require('mongoose')
const blue = require('./schemas/blue.js');    
const red = require('./schemas/red.js');
const green = require('./schemas/green.js');
const brown = require('./schemas/brown.js');
const grey = require('./schemas/grey.js');
const purple = require('./schemas/purple.js');
const gold = require('./schemas/gold.js');

const companyTypeModel = new mongoose.model('companyType', blue.companyTypeSchema);
const companyModel = new mongoose.model('company', blue.companySchema);
const clientModel = new mongoose.model('client', blue.clientSchema);
const studyClientModel = new mongoose.model('studyClient', blue.studyClientSchema);
const satisfactionModel = new mongoose.model('satisfaction', blue.satisfactionSchema);

const personModel = new mongoose.model('person', red.personSchema);
const adminModel = new mongoose.model('admin', red.adminSchema);
const userModel = new mongoose.model('user', red.userSchema);
const roleModel = new mongoose.model('role', red.roleSchema);
const pageModel = new mongoose.model('page', red.pageSchema);
const settingsModel = new mongoose.model('settings', red.settingsSchema);

const studyInfoModel = new mongoose.model('studyInfo', green.studyInfoSchema);
const studyProgressModel = new mongoose.model('studyProgress', green.studyProgressSchema)
const studyModel = new mongoose.model('study', green.studySchema);
const domainModel = new mongoose.model('domain', green.domainSchema);
const deliverableModel = new mongoose.model('deliverable', green.deliverableSchema);
const jehModel = new mongoose.model('jeh', green.jehSchema);
const phaseModel = new mongoose.model('phases', green.phaseSchema);
const studyDocsModel = new mongoose.model('studyDoc', green.studyDocsSchema);

const docModel = new mongoose.model('doc', brown.docSchema);
const versionModel = new mongoose.model('version', brown.versionSchema);
const articleModifModel = new mongoose.model('articleModif', brown.articleModifSchema);
const stateModel = new mongoose.model('state', brown.stateSchema);
const planningModel = new mongoose.model('planning', brown.planningSchema);
const phaseDescriptionModel = new mongoose.model('phaseDescription', brown.phaseDescriptionSchema);

const studyPostModel = new mongoose.model('studyPost', grey.studyPostSchema);
const flexContentModel = new mongoose.model('flexContent', grey.flexContentSchema);
const flexItemModel = new mongoose.model('flexItem', grey.flexItemSchema);

const auditCanalModel = new mongoose.model('audit', purple.auditCanalSchema);
const latexAuditiableContentModel = new mongoose.model('latexAuditiable', purple.latexAuditiableContentSchema);
const slackCanalModel = new mongoose.model('slack', purple.slackCanalSchema);
const appListModel = new mongoose.model('appList', purple.appListSchema);
const appMsgModel = new mongoose.model('appMsg', purple.appMsgSchema);
const mailProviderModel = new mongoose.model('mailProvider', purple.mailProviderSchema);
const msgBoxModel= new mongoose.model('msgBox', purple.msgBoxSchema);

const MRIModel = new mongoose.model('MRI', gold.MRISchema);
const formMRI = new mongoose.model('formMRI', gold.formMRISchema);
const formInterview = new mongoose.model('formInterview', gold.formInterviewSchema);
const studyAsigneeModel = new mongoose.model('studyAsignee', gold.studyAsigneeSchema);
const assigneeModel = new mongoose.model('assignee', gold.assigneeSchema);
const assigneeDocsModel = new mongoose.model('assigneeDocs', gold.assigneeDocsSchema);;
const assigneeInfoModel = new mongoose.model('assigneeInfo', gold.assigneeInfoSchema);

module.exports = {
    companyTypeModel,
    companyModel,
    clientModel,
    studyClientModel,
    satisfactionModel,
    personModel,
    adminModel,
    userModel,
    roleModel,
    pageModel,
    settingsModel,
    studyInfoModel,
    studyProgressModel,
    studyModel,
    domainModel,
    deliverableModel,
    jehModel,
    phaseModel,
    studyDocsModel,
    docModel,
    versionModel,
    articleModifModel,
    stateModel,
    planningModel,
    phaseDescriptionModel,
    studyPostModel,
    flexContentModel,
    flexItemModel,
    auditCanalModel,
    latexAuditiableContentModel,
    slackCanalModel,
    appListModel,
    appMsgModel,
    mailProviderModel,
    msgBoxModel,
    MRIModel,
    formMRI,
    formInterview,
    studyAsigneeModel,
    assigneeModel,
    assigneeDocsModel,
    assigneeInfoModel,}