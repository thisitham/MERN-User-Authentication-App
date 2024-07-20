const router = require("express").Router();

let Customer = require('../models/CustomerModel');
const Auth = require('../middleware/auth')


router.post("/", Auth, async (req,res) => {  // 'Auth' means haduwa middlware fun eka //me HTTP request eka weddi TOKEN eka thiynawada, eka correctda(verified ekakda)  means actualy admin log welada inne kiyna eka check krnna 
    const name = req.body.name;

    const newCustomer = new Customer({
        name,
    });

    await newCustomer.save().then( () => {
        res.status(200).send({status:"Customer Added..!"})
    }).catch( (err) => {
        console.log(err.message)
        res.status(500).send({status:"Error with Adding Customers..!", error:err.message})
    })
});


router.get("/", Auth, async (req, res) => {
    
    await Customer.find().then((customer) => {
        res.status(200).send({status:"Customers Fetched!",customer})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with Get Customers!", error: err.message})
    })

})


module.exports = router;