import "./App.css"
import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./services/user.service";
export default function App() {
  const [user,setUser] = useState({
    email : "",
    password : ""
  })
  const [login,{data}] = useLoginMutation()
  let navigate = useNavigate();
  const handleLogin =   async (e) => {
    e.preventDefault();
    await login(user)
  }
  useEffect(()=>{
    if(data){
      console.log(data);
      navigate("/products")
    }
  },[data])
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  return (
    <div className="App d-flex justify-content-center align-items-center">
    <div className='col-3'>
      <form onSubmit = {(e) => handleLogin(e)}>
        <div className="mb-3">
          <input type="text" name='email' onChange={(e) => handleChange(e)} placeholder='Email' className='form-control'/>
        </div>
        <div className="mb-3">
          <input type="password" name='password' onChange={(e) => handleChange(e)} placeholder='Password'  className='form-control'/>
        </div>
        <div className='text-center'>
          <button className='btn btn-light' type='submit'>SIGN IN</button>
        </div>
      </form>
    </div>
  </div>
  )
}
