import React from 'react'
import { Link } from 'react-router-dom'
import {BsPerson,BsCardList,BsCardChecklist} from 'react-icons/bs'
import "./SideNav.css"
export default function SideNav() {
  return (
    <div className='sideNav'>
      <ul className='d-flex justify-content-center'>
        <li className='nav-link'>
          <Link to="/users">
            <BsPerson/>
            USERS
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/products">
            <BsCardChecklist/>
            PRODUCTS LIST
          </Link>
        </li>
        <li className='nav-link'>
          <Link to="/blog">
            <BsCardList/>
            BLOGS LIST
          </Link>
        </li>
      </ul>
    </div>
  )
}
