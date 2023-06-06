import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv.config();

const databaseHost = process.env.DATABASE_HOST | "172.16.29.2";
const databasePort = process.env.DATABASE_PORT | 27017;
const databaseUser = process.env.DATABASE_USER | "admin";
const databasePassword = process.env.DATABASE_PASSWORD | "pass";
const databaseName = process.env.DATABASE_NAME | "app";
const databaseConnectionOpts = process.env.DATABASE_CONNECTION_OPTIONS | "";

export const url = "mongodb://" + databaseUser + ":" + databasePassword + "@" + databaseHost + ":" + databasePort + "/" + databaseName + "?" + databaseConnectionOpts;

mongoose.connect(url)
.catch((error) => {
    console.log(error);
})
.then(() => {
    console.log("Connected to database");
});