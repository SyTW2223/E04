import mongoose from "mongoose";

const databaseHost = "10.6.130.207"; // publica base de datos
const databasePort = "27017";
const databaseUser = "admin";
const databasePassword = "pass";
const databaseName = "app"
const databaseConnectionOpts = "directConnection=true";

const config = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 5000,
    useUnifiedTopology: true
}

export const url = "mongodb://" + databaseUser + ":" + databasePassword + "@" + databaseHost + ":" + databasePort + "/" + databaseName + "?" + databaseConnectionOpts;

mongoose.connect(url, config)
.catch((error) => {
    console.log(error);
})
.then(() => {
    console.log("Connected to database");
});