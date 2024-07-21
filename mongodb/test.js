// getting-started.js
const mongoose = require('mongoose');
const model = require('./models.js');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://137.194.13.82:27017/banger');
  console.log("Connection réussie à la DB");

  const Tanguy = new model.personModel({email:"qQp8d@example.com",firstname:"Tanguy",lastname:"Moulin",number:"0698765432",adress:"4 rue de la poisse 75010 Paris"});
  

  const gameCompany = new model.companyTypeModel({nbEmployees:100,size:"Large",domains:"Gaming"});
  

  const myCompany = new model.companyModel({address:"4 rue de la poisse 75010 Paris",members:[],type:gameCompany._id});

  const TanguysJob = new model.clientModel({name:"Tanguy",company:myCompany._id,person:Tanguy._id});

  myCompany.members.push(TanguysJob._id);
  

  await Tanguy.save();
  await TanguysJob.save();
  await gameCompany.save();
  await myCompany.save();


  console.log(await model.personModel.find());
  console.log(await model.companyTypeModel.find());
  console.log(await model.companyModel.find());
  console.log(await model.clientModel.find());  
}