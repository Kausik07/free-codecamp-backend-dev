require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://xxxxxxxxxx@cluster0.x1alefa.mongodb.net/fc-camp-1?retryWrites=true&w=majority');

const conn = mongoose.connection
conn.on('connected', function(){
console.log("Connected to Mongo 👍")
});

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});


const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = function(done) {
  const janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "kausik" , age: 20 , favoriteFoods: ["Momos"]},
  {name: "hellfire" , age: 18 , favoriteFoods: ["Chicken"]},
  {name: "Babun" , age: 20 , favoriteFoods: ["Burger"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.bulkWrite(arrayOfPeople, function(err, people){
    if (err) 
     return console.log(err);
    done(null, people);
  });  
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};


const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger'; 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if (err) return console.log(err);
      done(null, removedDoc);
    }
  )
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.bulkWrite({name: nameToRemove}, (err, response) => {
    if (err) console.log(err);
    done(null, response);
  });
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name : "asc"}).limit(2).select("-age").exec((err, data) => {
     if(err)
       done(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
