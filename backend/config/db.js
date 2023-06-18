import mongoose from "mongoose";

const databaseHost = "10.6.130.207"; // publica base de datos
const databasePort = "27017";
const databaseUser = "admin";
const DATABASEPASSWORD = "pass";
const DATABASENAME = "app"
const DATABASECONNECTIONOPTS = "directConnection=true";

//export const url = "mongodb://" + databaseUser + ":" + DATABASEPASSWORD + "@" + databaseHost + ":" + databasePort + "/" + DATABASENAME + "?" + DATABASECONNECTIONOPTS;
export const url = "mongodb+srv://javiidiazglez:equipo4@cluster0.1s5ihn3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
.catch((error) => {
    console.log(error);
})
.then(() => {
    console.log("Connected to database");
});