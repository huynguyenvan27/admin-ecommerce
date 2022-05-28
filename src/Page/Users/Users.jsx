import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/user.slice'
import { selectUser } from '../../store/slices/user.slice';
export default function Users() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  console.log(user);
  return (
    <div className='container'>
      <h5>Thông tin tài khoản</h5>
      <div className="row">
        <div className="col-2">
          <ul>
            <li>Username:</li>
            <li>Email:</li>
            <li>Phone:</li>
            <li className='mt-2'>Đổi mật khẩu:</li>

          </ul>
        </div>
        <div className='col-4'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
          <li className='mt-2'>
            <input  type="text" />
          </li>
          <button className='btn btn-light mt-2'>Chỉnh sửa</button>
        </div>
      </div>
    </div>
  )
}
