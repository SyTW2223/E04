import mongoose from "mongoose";

const databaseHost = "10.6.130.207"; // publica base de datos
const databasePort = "27017";
const databaseUser = "admin";
const DATABASEPASSWORD = "pass";
const DATABASENAME = "app"
const DATABASECONNECTIONOPTS = "directConnection=true";

const config = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 5000,
    useUnifiedTopology: true
}

export const url = "mongodb://" + databaseUser + ":" + DATABASEPASSWORD + "@" + databaseHost + ":" + databasePort + "/" + DATABASENAME + "?" + DATABASECONNECTIONOPTS;

mongoose.connect(url, config)
.catch((error) => {
    console.log(error);
})
.then(() => {
    console.log("Connected to database");
});