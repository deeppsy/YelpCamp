const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedhelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDb = async () => {
  await Campground.deleteMany({});
  //   const c = new Campground({ title: "jdjd", location: "hdjd" });
  //   await c.save();~
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60e4331819d72a447ce641fc",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur saepe impedit quam iusto cupiditate ad voluptatem, quod nulla consequatur repudiandae harum ipsa nobis ratione doloremque maxime ipsum facilis dolorem similique.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dv5yf8fqc/image/upload/v1625662608/YelpCamp/n1w52psrztq6uluykzqy.jpg",
          filename: "YelpCamp/n1w52psrztq6uluykzqy",
        },
        {
          url: "https://res.cloudinary.com/dv5yf8fqc/image/upload/v1625662608/YelpCamp/c1ymnopvsfygoij7d8ef.jpg",
          filename: "YelpCamp/c1ymnopvsfygoij7d8ef",
        },
        {
          url: "https://res.cloudinary.com/dv5yf8fqc/image/upload/v1625662607/YelpCamp/cbqtm6ap0qssmj8grmbg.jpg",
          filename: "YelpCamp/cbqtm6ap0qssmj8grmbg",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
