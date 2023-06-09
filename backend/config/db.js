import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv.config();

const databaseHost = "10.6.130.207";
const databasePort = "27017";
const databaseUser = "admin";
const databasePassword = "pass";
const databaseName = "app"
const databaseConnectionOpts = "directConnection=true";

export const url = "mongodb://" + databaseUser + ":" + databasePassword + "@" + databaseHost + ":" + databasePort + "/" + databaseName + "?" + databaseConnectionOpts;

mongoose.connect(url)
.catch((error) => {
    console.log(error);
})
.then(() => {
    console.log("Connected to database");
});