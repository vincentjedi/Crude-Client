import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8081/delete/${id}`)
          .then(() => {
            // Update the state by filtering out the deleted record
            setData(prevData => prevData.filter(item => item.CustomerId !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: 'linear-gradient(to right, #4FACFE, #00F2FE)' }}>
      <div className='w-50 bg-white rounded p-3 '>
        <h3>Customer List</h3>
        <div className='d-flex justify-content-end'>
          <Link to='/create' className='btn btn-success'>Create +</Link>
        </div>

        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>CustomerId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer, index) => (
              <tr key={index}>
                <td>{customer.CustomerId}</td>
                <td>{customer.Name}</td>
                <td>{customer.Email}</td>
                <td>
                  <Link to={`/read/${customer.CustomerId}`} className='btn btn-sm btn-info'>Read</Link>
                  <Link to={`/edit/${customer.CustomerId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                  <button onClick={() => handleDelete(customer.CustomerId)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
