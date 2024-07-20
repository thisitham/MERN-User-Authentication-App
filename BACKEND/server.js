const express = require("express"); //framework for Node.js
const mongoose = require("mongoose"); //to connect with mongodb
const bodyParser = require("body-parser");
const cors =  require("cors"); //when client and server side have different domain(two address) there can be error when responding client to server ,so to solve ti cors use as a middlware
const dotenv = require("dotenv") //using this we can create .env file using it we can contain sensitive information seperatly
const cookieParser = require("cookie-parser") //use to share cookie(request ekakin cookie eka ganna middlware ekata)

const app = express()   //creates an instance of the Express application

app.use(cors( {                      //app.use() is excuting function in express
        origin:["http://localhost:3000"],  //to save cookie localhost in frontend
        credentials: true,                 //to save cookie localhost in frontend //meka frontend eke axio fun eke last parameter eke call krnna oni as {withCredentials:true} //other wise app.js eke meheme -"axios.defaults.withCredentials = true;"  import karannath puluwn hama axios ekema call karanawa wenuwata
}));  

app.use(bodyParser.json());
app.use(cookieParser())

const PORT = process.env.PORT || 8060; //give port number in .env file to PORT variable and defaults to port 5000 if no port is specified.

dotenv.config();                      //Using dotenv: dotenv is a module that loads environment variables from a .env file into process.env. It helps keep your environment-specific configuration separate from your 



        //mongoose.connect(): This function is used to connect to a MongoDB database.
        //process.env.MONGO_URL: This retrieves the MongoDB URI from the environment variables. 
        //.then(): This is a promise function. If the connection is successful, the code inside .then() is executed.
        //.catch(): This is also a promise function. If an error occurs during the connection, the code inside .catch() is executed.

mongoose.connect(process.env.MONGO_URL,{
     //useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
     //useFindAndVerify: false
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log("NOT CONNECTED TO NETWORK", err))


        //app.listen() is used to start a web server and make it listen for connections on a specified port.
        //app.listen(PORT, callback)
        //PORT: The port number on which the server should listen.
        //callback: A function that is called once the server is running and ready to accept connections.  
        
        

const AdminRouter = require('./routes/AdminAuth');
const CustomerRouter = require('./routes/Customer');


app.use("/admin", AdminRouter);
app.use("/customer", CustomerRouter);



app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
})