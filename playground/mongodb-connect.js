const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://localhost:27017";
const dbName = 'MyTestTodoApp';
const client = new MongoClient(url);
client.connect((err) => {
    assert.equal(null, err);
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successfully connected to MongoDB server');
    const db = client.db(dbName);
    client.close();
});



// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const dbURL = 'mongodb://localhost:27018/MyTestTodoApp';
// const dbName = 'MyTestTodoApp';
// const client = new MongoClient(dbURL);

// client.connect((err) => {
//     assert.equal(null, err);
//     if(err) {
//         return console.log('unable to connect to mongodb server');
//     }
//     console.log('successfully connected to mongodb server');
//     const db = client.db(dbName);
//     client.close();
// });