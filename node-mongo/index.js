const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Requiring Operator.js
const dboper = require('./operators');

const url = "mongodb://localhost:27017/";
const dbname = 'Data1';

// The Connect method allows us to connect to the mongodb server 
MongoClient.connect(url,(err,client) => {

    // The assert function help us to check that error is equal to null, if err is not equal to null then there is Some error
    assert.equal(err,null); 

    console.log('Connecting correctly to server');
    
    // To connect to the database
    const db = client.db(dbname); 

    dboper.insertDocument(db,{name: 'Burger' , description: 'Test'},'dishes',(result) => {

        console.log('Inserted document:\n ', result.ops);

        dboper.findDocument(db,'dishes',(docs)=>{
            console.log('Found document:\n',docs);

            dboper.updateDocument(db,{name:"Burger"},{description:"Updated Test"},'dishes',(result)=>{
                console.log('Updated document:\n ', result.result);

                dboper.findDocument(db,'dishes',(docs)=>{

                    console.log('Found Document:\n ', docs);

                    db.dropCollection('dishes',result => {
                       console.log('Dropped Document:\n ', result);
                        client.close();
                    });

                    
                })
            });
        });
    });
    
     

});