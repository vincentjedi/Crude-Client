import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function Edit() {

    const {id} = useParams();
    

    useEffect(() => {
        axios.get('https://crud-server-cust.vercel.app/read/'+id)
        .then(res => {
            console.log(res)
        setValues({...values, name:res.data[0].Name, email:res.data[0].Email})
        })
        .catch(err => console.log(err))
            },[]);

    const [values, setValues] = useState({
        name: '',
        email: ''
    })

    const navigate = useNavigate();

    const handleUpdate = (event) => {
event.preventDefault();
Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update!"
  }).then((result) => {
    if (result.isConfirmed) {
        axios.put('https://crud-server-cust.vercel.app/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
      Swal.fire({
        title: "Updated!",
        text: "Customer details Updated!",
        icon: "success"
      });
    }
  });
        
       
    }

    
    
  return (
    <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleUpdate}>
                <h2>Update Customer Details</h2>

                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='name' className='form-control'
                    onChange={(e) => setValues({...values, name: e.target.value})}
                    value={values.name}
                    ></input>
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='text' placeholder='email' className='form-control'
                    onChange={(e) => setValues({...values, email: e.target.value})}
                    value={values.email}
                    ></input>
                </div>

                <button className='btn btn-success'>Update</button>
            </form>
        </div>
      
    </div>
  )
}

export default Edit
