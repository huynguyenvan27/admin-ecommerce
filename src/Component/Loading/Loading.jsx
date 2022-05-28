import React from 'react'
import ReactLoading from 'react-loading';
const Loading = () => (
  <div className='d-flex justify-content-center '>
    <ReactLoading type='bars' color = "black" height={64} width={64}  />
  </div>
);
export default Loading