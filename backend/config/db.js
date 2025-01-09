const mongoose = require("mongoose");
console.log(process.env.DATABASE_CONNECTION);
console.log(process.env.DATABASE_NAME);
mongoose.connect(`${process.env.DATABASE_CONNECTION}/${process.env.DATABASE_NAME}`)
.then(()=>console.log("Database connected successfully!!"))
.catch((err)=>console.log("Something went wrong in DB connection",err))
module.exports = mongoose.connection;