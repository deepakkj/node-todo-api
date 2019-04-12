const { MongoClient } = require('mongodb');

const dbName = 'TodosApp4';
const dbURL = 'mongodb://localhost:27017';

// Create a Client instance
const client  = new MongoClient(dbURL, { useNewUrlParser: true });



// Make a connection to the created Client instance
client.connect((err) => {
    if(err) {
        return console.log('--- >  Unable to make a connection the Mongo Server');
    }
    console.log('--- >  Successfully connected to the Mongo Server');

    // Create a Database
    const db = client.db(dbName);

    // Create a new Collection or connect to the existing Collection
    const collection = db.collection('TodosTable');
    // Insert one Document to the Collection
    insertOneDocument(collection, () => {
        // insertManyDocuments(collection, () => closeClientConnection(client));
        findAllDocuments(collection, () => closeClientConnection(client));
        // findDocument(collection, () => closeClientConnection(client));
        // updateDocument(collection, () => closeClientConnection(client));
        // removeDocument(collection, () => closeClientConnection(client));

    });

    const collection2 = db.collection('UsersTable');

    insertOneDocument(collection2, () => closeClientConnection(client));
    

});

// Close the connection to the Mongo Client Server
function closeClientConnection(client) {
    client.close();
    console.log('--- >  Connection closed to the Mongo Server');
}


const insertOneDocument = (collection, callback) => {
    collection.insertOne({
        text: 'Make Airtel Broaband payment',
        isCompleted: false
    }, (err, result) => {
        if(err) {
            return console.log('--- > Unable to add a Document to the TodosTable Collection', err);
        } else {
            console.log('--- > n', result.result.n);
            console.log('--- > ops', result.ops);
            console.log('--- > Successfully inserted data into the Collection');
            callback(result);
        }
    });
};

const insertManyDocuments = (collection, callback) => {
    collection.insertMany([{
        text: 'Bring vegetables',
        isCompleted: false
    }, {
        text: 'Bring milk',
        isCompleted: false
    }], (err, result) => {
        if(err) {
            return console.log('--- > Unable to add a many Documents to the TodosTable Collection', err);
        } else {
            console.log('--- > n', result.result.n);
            console.log('--- > ops', result.ops);
            console.log('--- > Successfully inserted many data into the Collection');
            callback(result);
        }
    });
}

const findAllDocuments = (collection, callback) => {
    collection.find({}).toArray((err, result) => {
        if(err) {
            return console.log('--- > Unable to find Documents from the TodosTable Collection', err);
        } else {
            console.log('--- > result', result);
            console.log('--- > Successfully found Documents from the Collection');
            callback(result);
        }
    });
    //  collection.find({}).toArray().then((result) => {
    //      console.log('---------------', result);
    //  }, (err) => {
    //      console.log(' ---------- --------------------- ERROR');
    //  });
};

const findDocument = (collection, callback) => {
    collection.find({
        text: 'Make Airtel Broaband payment'
    }).toArray((err, result) => {
        if(err) {
            return console.log('--- > Unable to find a Document from the TodosTable Collection', err);
        } else {
            console.log('--- > result', result.length);
            console.log('--- > Successfully found a Document from the Collection');
            callback(result);
        }
    });
};

const updateDocument = (collection, callback) => {
    collection.updateOne({
        text: 'Make Airtel Broaband payment'
    }, {
        $set: { text: 'Bring milk'  }
    }, (err, result) => {
        if(err) {
            return console.log('--- > Unable to update a Document in the TodosTable Collection', err);
        } else {
            console.log('--- > result', result.result.n);
            console.log('--- > Successfully updated Document in the Collection');
            callback(result);
        }
    });
};

const removeDocument = (collection, callback) => {
    collection.deleteOne({
        text: 'Bring vegetables'
    }, (err, result) => {
        if(err) {
            return console.log('--- > Unable to delete a Document in the TodosTable Collection', err);
        } else {
            console.log('--- > result', result.result.n);
            console.log('--- > Successfully deleted Document in the Collection');
            callback(result);
        }
    });
};