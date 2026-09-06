import { Db, MongoClient } from "mongodb";
const uri=process.env.MONGODB_URI;
type Cache={client:MongoClient|null;promise:Promise<MongoClient>|null;indexes:boolean};
const globalMongo=globalThis as typeof globalThis & {__shdMongo?:Cache};
const cache=globalMongo.__shdMongo??{client:null,promise:null,indexes:false};
globalMongo.__shdMongo=cache;
export async function getDb():Promise<Db>{
  if(!uri) throw new Error("MONGODB_URI is not configured");
  if(!cache.client){cache.promise??=new MongoClient(uri,{maxPoolSize:10}).connect();cache.client=await cache.promise;}
  const db=cache.client.db();
  if(!cache.indexes){await Promise.all([db.collection("properties").createIndex({reference:1},{unique:true}),db.collection("contacts").createIndex({createdAt:-1}),db.collection("import_logs").createIndex({createdAt:-1})]);cache.indexes=true;}
  return db;
}
