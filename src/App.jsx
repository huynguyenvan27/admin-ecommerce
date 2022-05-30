import "./App.css"
import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./services/user.service";
import Loading from "./Component/Loading/Loading";
import { useForm } from "react-hook-form";
export default function App() {

  const [login,{data,isLoading,error}] = useLoginMutation()
  let navigate = useNavigate();

  useEffect(()=>{
    if(data){
      console.log(data);
      navigate("/products")
    }
  },[data])
  const {register,handleSubmit,formState:{errors}} = useForm()

  if(isLoading){
    return <Loading/>
  }
  const onSubmit = async (user) =>{
    await login({
      email:user.email,
      password:user.password
    })
  }
  return (
    <div className="App d-flex justify-content-center align-items-center">
    <div className='col-lg-3 col-sm-6 col-xs-12'>
      <form onSubmit = {handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input type="text" name='email' {...register("email",{required:true,pattern : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} placeholder='Email' className='form-control'/>
          {errors.email?.type == "required" && <li className="text-light">Email is required!</li>}
          {errors.email?.type == "pattern" && <li className="text-light">Email is inVaild!</li>}
        </div>
        <div className="mb-3">
          <input type="password" name='password' {...register("password",{required:true})}  placeholder='Password'  className='form-control'/>
          {errors.password && <li className="text-light">Password is required!</li>}
          {error && <li className="text-light">Password is incorrect</li>}
        </div>
        <div className='text-center'>
          <button className='btn btn-light' type='submit'>SIGN IN</button>
        </div>
      </form>
    </div>
  </div>
  )
}
