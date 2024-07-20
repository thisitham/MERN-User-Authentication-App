import axios from "axios";
import React, { useEffect, useState } from "react";

function Customers() {
     
    const [name, setName] = useState("");

    async function AddCustomer(e){
        e.preventDefault();

        const newCustomer = {
            name
        }

        await axios.post('http://localhost:8060/customer', newCustomer, {withCredentials: true}).then(() => {  //withCredentials: true is used to include cookies in the request.
            alert("Customer Added")
            window.location.replace('http://localhost:3000/customer'); // after add navigate to same page (refress wenne nathi nisa)
        }).catch((err) => {
            alert(err)
        })
    }


    //----------------------------------------------------


    const[customers, setCustomers] = useState([]);


    async function getStudents(){
        await axios.get('http://localhost:8060/customer', {withCredentials: true}).then((res) => {
            console.log(res.data);
            setCustomers(res.data.customer);
        }).catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getStudents();
    },[])



return (
    <div>

       <form onSubmit={AddCustomer}>
            <input type="text" placeholder="Customer name"
            onChange={(e) => {
                setName(e.target.value);
            }}
            />
            <button type="submit">Save new customer</button>
        </form>
         
         <div>
          <ul>
            {customers.map((customer,index) => (
            <li key={index}>{customer.name}</li>
            ))}
          </ul>
         </div>


    </div>
);
}

export default Customers;