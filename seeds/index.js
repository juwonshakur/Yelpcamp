const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '62e148efb83b278b45966a4b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dikpiz2ia/image/upload/v1659557003/YelpCamp/rqd7ayd9cp3bscw2gokm.jpg',
                    filename: 'YelpCamp/rqd7ayd9cp3bscw2gokm'
                },
                {
                    url: 'https://res.cloudinary.com/dikpiz2ia/image/upload/v1659557008/YelpCamp/dgqvyrzkddoxnbeb4tjo.jpg',
                    filename: 'YelpCamp/dgqvyrzkddoxnbeb4tjo'
                },
                {
                    url: 'https://res.cloudinary.com/dikpiz2ia/image/upload/v1659557011/YelpCamp/p4aiyazfep0d94zftj3o.jpg',
                    filename: 'YelpCamp/p4aiyazfep0d94zftj3o'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

