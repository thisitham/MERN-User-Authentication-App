const jwt = require("jsonwebtoken");

function auth(req, res, next) {     //req (the request object), res (the response object), and next (a function to pass control to the next middleware).
    try{
        //console.log(req.cookies);

        const token = req.cookies.token;  //Extracts the token cookie from the request. This is the JWT that was stored in a cookie when the user logged in.

        if(!token) {
            return res.status(401).json({ errorMessage: "Unauthorized" }); //Checks if the token is not present. and if not present show as "Unauthorized"
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);  //Verifies the token using the jwt.verify method with the secret key stored in the environment variable JWT_SECRET
                                                                     //If the token is valid, it returns the decoded payload (which includes the admin ID).
                                                                     //verified variable ekata enne  payload eka 'Token eke ID ekai'(mean loged user ID) and{ admin: '668eb483d84c9b6072443a74', iat: 1720682876 }
                                                                     //so me loged user ge id eka thamai api req.admin ekata ganne api
                                                                     // so me Auth fun eka HTTP req ekeka parameter eke call karama loged nn not unauthorized

        //console.log(verified);
        req.admin = verified.admin;       //If the token is valid, it returns the decoded payload (which includes the admin ID).
                                          //token eka hadanakota id ekata dena key eka thamai me 'admin' kiynne  //(jwt.sign({admin:findUser._id}, process.env.JWT_SECRET);)
                                          //verified.admin - kiynne  meken ganna admin key eka -jwt.sign({ admin: findUser._id }, process.env.JWT_SECRET);
                                          //req.admin - sets a new property named admin on the req object. By doing this, you attach the admin's ID to the request object.(verified.admin eken ganna id eka aluthen admin kiyla ekk hadala pass karanawa req.admin widihata)
        
        
        next();                           //Passes control to the next middleware function or route handler in the stack.
                                          
    }catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = auth;



// This middleware function auth is designed to protect routes by ensuring that the request includes a valid JWT token in the cookies. Here's a step-by-step summary:
// meka use krnne mokk hari fun ekk hari HTTP req ekk hari run weddi e route eke Token eka thiynawada balanna
// e kiynne log welada inne kiyna eka ( log wela nn neh token eka thiyenne )
// relavant HTTP request wala paramete eke me fun eka call karanna oni




//Steps(uda code eke steps)
// 1.Extract Token: The token is extracted from the cookies in the request.
// 2.Check Token: If the token is missing, respond with a 401 Unauthorized status.
// 3.Verify Token: The token is verified using a secret key. If valid, the decoded payload is obtained.
// 4.Attach Admin ID: The admin ID from the token is attached to the req object.
// 5.Pass Control: Control is passed to the next middleware or route handler.
// 6.Handle Errors: If any errors occur (e.g., invalid token), catch them, log the error, and respond with a 401 Unauthorized status.