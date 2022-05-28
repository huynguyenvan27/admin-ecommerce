import React from 'react'
import {BsPersonCircle} from 'react-icons/bs'
import * as style  from "./Header.component.css"
import { useState ,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Overlay } from 'react-bootstrap';
import {BsBoxArrowRight} from 'react-icons/bs'
import { logout } from '../../store/slices/user.slice';
export default function Header() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout)
    navigate("/")
  }
  return (
    <div className="header">
      <div className="container">
        <ul className="d-flex justify-content-between align-items-center" >
          <li className='search-bar'>
            <input placeholder='Tìm kiếm'/>
          </li>
          <li className='hyystore'>
            HYYSTORE
          </li>
          <li  className='user-icon' ref={target} onClick={() => setShow(!show)}>
            <BsPersonCircle/>
          </li>
          <Overlay target={target.current} show={show} placement="bottom">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: '#6667ab',
                  padding: '1px 5px',
                  marginTop : "5px",
                  color: '#fff',
                  borderRadius: 3,
                  ...props.style,
                }}
              > 
                <div>
                  <button className='btn text-white' onClick={handleLogout}>
                      Logout
                      <BsBoxArrowRight className='ms-2'/>
                  </button>

                </div>
              </div>
            )}
          </Overlay>
   
        </ul>
      </div>
    </div>
  )
}
