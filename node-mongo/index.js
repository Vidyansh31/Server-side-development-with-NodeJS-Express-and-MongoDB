const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://localhost:27017/";
const dbname = 'Data1';

// The Connect method allows us to connect to the mongodb server 
MongoClient.connect(url,(err,client) => {

    // The assert function help us to check that error is equal to null, if err is not equal to null then there is Some error
    assert.equal(err,null); 

    console.log('Connecting correctly to server');
    
    // To connect to the database
    const db = client.db(dbname); 

    const collection = db.collection('dishes'); 

    collection.insertOne({"name": "Uttapizza","description":"test"},(err,result) =>{
        assert.equal(err,null);

        console.log('After insert:\n');
        console.log(result.ops);
        // we get the result value that is returned there, This result will also provide this OPS property which says how many operations have just been carried out successfully


        collection.find().toArray((err,docs) => {
            assert.equal(err,null);

            console.log('Found \n');
            // this will return all the documents present in Dishes
            console.log(docs);

            // Dropcollection method is used to remove the dishes collection from the database
            db.dropCollection('dishes',(err,result) =>{
                assert.equal(err,null);

                client.close();
            });
        });

    });


});