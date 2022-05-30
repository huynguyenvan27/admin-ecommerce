import "./App.css"
import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./services/user.service";
import Loading from "./Component/Loading/Loading";
export default function App() {
  const [user,setUser] = useState({
    email : "",
    password : ""
  })
  const [login,{data,isLoading}] = useLoginMutation()
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
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="App d-flex justify-content-center align-items-center">
    <div className='col-lg-3 col-sm-6 col-xs-12'>
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
