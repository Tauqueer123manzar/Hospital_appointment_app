const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:"./config/.env"});
main().then(()=>{
    console.log("!!!!Mongodb database connection sucessfully!!!!");
 }).catch((error)=>{
     console.log(`${error.message}`);
 })
 
 async function main(){
     await mongoose.connect(process.env.MONGO_URI);
 };

module.exports=mongoose.connection;