import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from './Header/Header'
import SideNav from './SideNav/SideNav'
import { selectUser } from '../store/slices/user.slice'
import { useSelector } from 'react-redux'
export default function Layout() {
  const user = useSelector(selectUser)
  if(!user){
    return (
      <>
        <p>Bạn chưa đăng nhập !!!!</p>
        <Link to="/">Nhấn vào đây để quay lại đăng nhập</Link>
      </>
    )

  }
  return (
    <div>
      <Header/>
    <div className="container">
      <SideNav/>
      <Outlet/>
    </div>
  </div>
  )
}
