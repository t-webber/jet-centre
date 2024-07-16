// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://137.194.13.82:27017/banger');
  console.log("Connection réussie à la DB");

  const JEH = new mongoose.Schema({
    phase: BigInt,
    deliverable: String
  });
  const Jeh = mongoose.model('Jeh', JEH);
  const myJEH=new Jeh({phase:2,deliverable:"Rien du tout"})


  JEH.methods.speak = function speak() {
    const greeting = this.phase
      ? 'Meow name is ' + this.phase + this.deliverable
      : 'I don\'t have a name';
    console.log(greeting);
  };

  const Cat = mongoose.model('Cat', JEH);
  const kitty = new Cat({ phase: 3, deliverable: 'Kitty' });
  kitty.speak();

  await kitty.save(); 
  console.log(await Cat.find());
  }