import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'



function Read() {

    const {id} = useParams();
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
axios.get('http://localhost:8081/read/'+id)
.then(res => {
    console.log(res)
setCustomer(res.data[0])
})
.catch(err => console.log(err))
    },[])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
<h4>Customer Details</h4> <hr />
<p>ID: {customer.CustomerId}</p>
<p>Name: {customer.Name}</p>
<p>Email: {customer.Email}</p>

<hr />

<Link to='/' className='btn btn-info m-1'>Back</Link> 
<Link to={`/edit/${customer.CustomerId}`} className='btn btn-primary margin-left-2'>Edit</Link>

        </div>
      
    </div>
  )
}

export default Read
