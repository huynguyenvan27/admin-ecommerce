import React from 'react'
import {BsClipboardPlus,BsDownload} from "react-icons/bs"
import { Link } from 'react-router-dom'
export default function Sub() {
  return (
    <div className='d-flex justify-content-end mb-5'>
      <Link to = "/add-product" className='btn me-3 btn-primary'><BsClipboardPlus/>  Thêm sản phẩm</Link>
      {/* <button className='btn btn-primary'><BsDownload/>  EXPORT</button> */}
    </div>
  )
}
