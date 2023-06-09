import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv.config();

const databaseHost = "172.16.29.2";
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