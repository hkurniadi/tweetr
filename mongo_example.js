"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //THIS IS THE LONG WAY
  //
  // db.collection('tweets').find({}).toArray((err, resultsArray) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log('results to array: ', resultsArray);
  //
  //   // This is the end of program now
  //   db.close();
  // });

  //THIS IS THE SHORTER WAY, REFACTORED USING CALLBACKS
  //
  //This function definition could be placed anywhere
  // function getTweets(callback) {
  //   db.collection('tweets').find({}).toArray((err, tweets) => {
  //     if (err) {
  //       //The callback takes in two arguments, so 'err' should be passed in
  //       return callbacks(err);
  //     }
  //     //Return the result through this callback, since the next line of code gets //executed, 'err' becomes 'null' (i.e. no error)
  //     callback(null, tweets);
  //   });
  // }
  //
  // //This getTweets function can be invoked anytime, but must be within this connected db
  // getTweets((err, tweets) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("Logging each tweet: ");
  //   for (let tweet of tweets) {
  //     console.log(tweet);
  //   }
  //   db.close();
  // });

  //THIS IS EVEN SHORTER, REFACTOR THE ABOVE CODE
  //
  //The callback inside the toArray method pretty much does the same thing as the //callback function, so callback can directly called from here

  function getTweets(callback) {
    db.collection('tweets').find({}).toArray(callback);
  }

  //This getTweets function can be invoked anytime, but must be within this connected db
  getTweets((err, tweets) => {
    if (err) {
      throw err;
    }
    console.log("Logging each tweet: ");
    for (let tweet of tweets) {
      console.log(tweet);
    }
    db.close();
  });
});
