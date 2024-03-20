import React from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from "react-router-dom"
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Component/Create'
import Read from './Component/Read'
import Edit from './Component/Edit'



function App() {
  return (
    <Router>
   
    <Routes>
     <Route path='/' element={< Home />}></Route>
     <Route path='/create' element={<Create />}></Route>
     <Route path='/read/:id' element={< Read />}></Route>
     <Route path='/edit/:id' element={< Edit />}></Route>
    </Routes>
    </Router>
  )
}

export default App
