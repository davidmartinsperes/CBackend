const {MongoClient} = require('mongodb');

const url = "mongodb+srv://<>:<>@aulaadsm1a.kfj7xym.mongodb.net/";

const client = new MongoClient(url);

async function conectar() {
    try {
        await client.connect("agenda");
        console.log("Conectado");
    } catch(e){
        console.log ("Erro ao conectar no MongoDB", e.message);
    }
}

module.exports = conectar;