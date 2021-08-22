const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/Data1';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected Correctly to the server');

    // Created a New Dish
    var newDish = Dishes({
        name:'Samose',
        description:'test'
    })
    // This save function is used to save the New Dish data
    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => console.log(err));
});