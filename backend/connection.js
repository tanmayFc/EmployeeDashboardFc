import mongoose from "mongoose";

export default async function connectToDb(dbUrl){
    mongoose.connect(dbUrl)
    .then(()=>console.log("Connected to db"))
    .catch((err)=>console.log("Error at db connection " + err))
}

// const myDB = mongoose.connection.useDb('product');
// module.exports = myDB.model("Snack", snackSchema);
// //user databse
// const myDB = mongoose.connection.useDb('user');
// module.exports = myDB.model("User", userSchema);