const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//const AdminSchema = require("../models/AdminAuthModel");
let Admin = require('../models/AdminAuthModel');


//register
router.post("/", async (req,res) => {

    
  try{
            const { email, password, passwordVerify } = req.body; //This line destructures the req.body (client dena ewa gannawa form eke) to extract the email, password, and passwordVerify properties.


            //validations

            if (!email || !password || !passwordVerify){                                          //If any of the fields (email, password, passwordVerify) are missing, a response with a 400 Bad Request status code is sent, indicating that some required fields are missing.
                return res.status(400).json({errorMessage: "Please enter all required fields."});
            }

            if (password.length < 4){
                return res.status(400).json({errorMessage: "Please enter a password of at least 4 characters."});  //If the password length is less than 4 characters, a response with a 400 Bad Request status code is sent, indicating that the password is too short.
            }

            if (password !== passwordVerify){
                return res.status(400).json({errorMessage: "Please enter the same password twice."});   //If the password doesn't match the passwordVerify, a response with a 400 Bad Request status code is sent, indicating that the passwords don't match.
            }

            // create the hash password with salt
            const salt = await bcrypt.genSalt();                    //This line generates a random salt using the bcrypt library. Salting is a security practice that helps make password storage more secure.
            const passwordHash = await bcrypt.hash(password, salt);  //This line hashes the password using the bcrypt library with the generated salt.

            const newAdmin = new Admin({             //This line creates a new instance of the Admin model with the provided email and the hashed password.
                email,
                password : passwordHash,            //Methana db(schema) eke variable ekai methana(udin awih hash eka watenne 'passwordHash' variable ekata ) variable ekai diffirence nisa thamai mehema denne. dekama same nn witharai ekk denne.
            })

            const saveadmin = await newAdmin.save();      //This line attempts to save the new admin object to the database using the save() method

            //sign the token
            const token = jwt.sign({admin:saveadmin._id}, process.env.JWT_SECRET); //save karapu admin ge 'ID' ekai, .env eke dunna secret key(JWT_SECRET/ secret password) ekai use karala generate karanawa JSON Web token ekk //Tokens are commonly used for authentication.
                                                                                   //jwt.sign(ID_of_user,SECRET_KEY) -- parameters
                                                        
            //console.log(token)

            // send the token in a HTTP-only cookie  //.cookie(name_of_cookie, value(Token), options) -- 3 parameters
            res.cookie("token", token, {          //we stored generated token inside cookie      //more secure approach is to store the JWT in the browser's local storage or in an HttpOnly cookie. HttpOnly cookies prevent client-side JavaScript from accessing the cookie, mitigating the XSS risk.
                httpOnly: true,               //'httpOnly' flag makes the cookie inaccessible to client-side JavaScript     
                secure: true,                 //secure: true ensures the cookie is sent over HTTPS
                sameSite: "none",             //sameSite: "none" allows the cookie to be sent in cross-site requests.

            }).send();     //Sends the response.

            //res.status(500).send({status:"Admin Saved!"});

    }catch (err) {
        console.error(err);
        res.status(500).send();
    }

});


//login

router.post("/login", async (req,res) => {
    try{

        const{ email, password } = req.body;

        // validate

        if (!email || !password ){                                          //If any of the fields (email, password, passwordVerify) are missing, a response with a 400 Bad Request status code is sent, indicating that some required fields are missing.
            return res.status(400).json({errorMessage: "Please enter all required fields."});
        }

        const findUser = await Admin.findOne({email});

        if (!findUser){
            return res.status(401).json({ errorMessage: "Wrong email or password." });
        }

        const passwordCorrect =  await bcrypt.compare( password, findUser.password);

        if(!passwordCorrect){
            return res.status(401).json({ errorMessage: "Wrong password." });
        }

        //sign the token

        const token = jwt.sign({admin:findUser._id}, process.env.JWT_SECRET);


        // send the token in a HTTP-only cookie  //.cookie(name_of_cookie, value(Token), options) -- 3 parameters
        res.cookie("token", token, {          //we stored generated token inside cookie      //more secure approach is to store the JWT in the browser's local storage or in an HttpOnly cookie. HttpOnly cookies prevent client-side JavaScript from accessing the cookie, mitigating the XSS risk.
            httpOnly: true,               //'httpOnly' flag makes the cookie inaccessible to client-side JavaScript     
            secure: true,                 //secure: true ensures the cookie is sent over HTTPS
            sameSite: "none",             //sameSite: "none": This allows the cookie to be sent in cross-site requests. This is useful for situations where the client and server are on different domains.

        }).send();     //Sends the response.

        //res.status(500).send({status:"login succesfull!"});

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})


//logout
router.get("/logout", (req,res) => {  // create empty cookie when GET request logout
    res.cookie("token", "", {         // This sets a cookie named token to an empty string "". 
        httpOnly: true,               // httpOnly flag makes the cookie inaccessible to client-side JavaScript, helping to protect against cross-site scripting (XSS) attacks.
        expires: new Date(0),         // This sets the cookie's expiration date to the Unix epoch (January 1, 1970). Setting the expiration date to the past effectively deletes the cookie.
        secure: true,                 //secure: true: The secure flag ensures the cookie is only sent over HTTPS connections.
        sameSite: "none",             //sameSite: "none": This allows the cookie to be sent in cross-site requests. This is useful for situations where the client and server are on different domains.

    }).send();    //end(): Sends the response back to the client, completing the request.
});


//logedIN

//this is use to identify we are loged in or not //component wala access hadanna use krnna puluwn frontend eke
router.get("/loggedIn",(req,res) => {
    try{
        const token = req.cookies.token;  //first server eke cookie eke token eka thiynawanam(means loged nam) token eka gannawa like this
        if (!token){       //if token not available
            return res.json(false);  //send false(0) //means Not loged in kiyna status eka denawa

        }
        jwt.verify(token, process.env.JWT_SECRET); //verify token with secret key 

        res.send(true);      //if token verified then send true(1) //means a Authorized user loged in kiyna status eka denawa

    }catch(err){
        res.json(false);    //if we have unverified token then also false(0) //means Not loged in kiyna status eka denawa
    }
})

module.exports = router;