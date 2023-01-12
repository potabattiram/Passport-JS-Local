const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
let client;

async function main() {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('connected to mongo db')
    }
    catch(e){
        console.log(e)
    }
    finally {
        // await client.close();
    }
}
main().catch(console.error);

module.exports = { client };