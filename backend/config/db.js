const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME ||"maintenance_handover";  

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db;

  await client.connect();
  db = client.db(dbName);
  console.log("Connected to MongoDB");
  return db;
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}

module.exports = { connectDB, getDb };