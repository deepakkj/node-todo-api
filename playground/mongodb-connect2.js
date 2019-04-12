const MongoClient = require('mongodb').MongoClient;


const dbURL = 'mongodb://localhost:27017';

const dbName = 'TodosApp3';

const client = new MongoClient(dbURL);

client.connect((err) => {
    if(err) {
        return console.log("Unable to make a connection to MongoDB server", err);
    }
    console.log('Connection successfull to MongoDB server');
    const db = client.db(dbName);

    const collection = db.collection('Todos');
    collection.insertOne({
        text: 'Hello World 7',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log("Unable to add data", err);
        }
        console.log("Added 3 data", Object.keys(result));
        client.close(result);
    });
    
});
