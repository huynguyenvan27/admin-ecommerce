import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../../services/product.service'
import { useForm } from 'react-hook-form'
import { useGetProductByIdQuery } from '../../services/product.service'
import { useState } from 'react'
import { convertBase64 } from '../../util'
import Loading from '../../Component/Loading/Loading'
import { selectProductById } from '../../store/slices/product.slice'
import { useSelector } from 'react-redux'
export default function Productdt() {
  const {id} = useParams()
  const  [size,setSize] = useState([])
  // const {data,isFetching,isSuccess} = useGetProductByIdQuery(id)

  const [updateProduct,{isLoading,isSuccess}] = useUpdateProductMutation()

  const {handleSubmit,register,formState:{errors},reset,getValues} = useForm()

  const data = useSelector(selectProductById(id))

  useEffect ( () => {
    if(data){
      setSize(data.list_size)
    }
  },[data])
  const handleSize  = (e) => {
    if(e.target.checked){
      setSize([
        ...size,
        +e.target.value
      ])
    }else{
      const filter = size.filter(item => item !== +e.target.value)
      setSize([...filter])
    }
  }

  const [imgList,setImgList] = useState([])
  
  const handleDetele = (id) => {
    setImgList([
      ...imgList,
      id
    ])
  }
  const [imgCover,setImgCover] = useState(data.img)

  const handleDeteleCover = () => {
    setImgCover("")
  }
  const handleUndoCover = () => {
    setImgCover(data.img)
  }

  const onSubmit = async (product) => {
    const arr = []

    for (let i = 0; i < product.imgDetail?.length; i++) {
      arr.push(convertBase64 (product.imgDetail[i]))
    }
    // Convert file image to base 64
    const base64Detail = await Promise.all(arr)
    let base64Cover = ""
    if(product.img){
      base64Cover = await convertBase64 (product.img[0]) ;
    }

    const list = [...data.imgLg].filter((item,id) => !imgList.includes(id))
    const newData = {
      ...product,
      id : id,
      img : imgCover.concat(base64Cover),
      imgDetail:[...list].concat([...base64Detail]),
      imgLg: [...list].concat([...base64Detail]),
      list_size : [...size]
  }

    await(updateProduct(newData)
    )
  }

  function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
  }

  var result = range(35, 45, 0.5);

  if(!data){
    return <Loading/>
  }
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                name='name' id="name" 
                defaultValue={data.name}
                {...register("name",{required:true})}
              />
              {errors.name?.type === "required" && <li className='text-danger'>Name is required!</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select 
                className="form-select" 
                name='type' 
                id='category'
                defaultValue={data.category}
                {...register("type",{required:true})}              
              >
                <option defaultValue="sneaker">Sneaker</option>
                <option value="accessory">Accessory</option>
              </select>
            {errors.type?.type === "required" && <li className='text-danger'>Category is required!</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Brand</label>
              <input 
                type="text" 
                className="form-control" 
                name='brand' 
                id="brand"
                defaultValue={data.brand}
                {...register("brand",{required:true})}
                />
                {errors.brand?.type === "required" && <li className='text-danger'>Brand is required!</li>}
            </div>

            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Chọn Size</label>
              <div>
              {
                result.map(item=>{
                  return(
                  <span key= {item}>
                    <input type="checkbox" name='item' key={item} id={`${item}-category`} value={item} className="d-none" defaultChecked = {data.list_size.includes(item)}  onChange={(e) => handleSize(e)}/>
                    <label htmlFor= {`${item}-category`} className="btn-size">{item}</label>
                  </span>
                    )})
                }
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input 
                type="number" 
                className="form-control" 
                name='price' 
                id="price"
                defaultValue={data.price}
                {...register("price",{required:true,valueAsNumber:true})}
                />
                {errors.price?.type === "required" && <li className='text-danger'>Price is required!</li>}
                {errors.price?.type === "valueAsNumber" && <li className='text-danger'>Price must be is Number</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input 
                type="number" 
                className="form-control" 
                name='inStock' 
                id="quantity"
                defaultValue={data.inStock}
                {...register("inStock",{required:true})}
              />
              {errors.inStock?.type === "required" && <li className='text-danger'>Quantity is required!</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="sale" className="form-label">Sale</label>
              <input 
                type="number" 
                className="form-control" 
                name='discount' 
                id="sale"
                defaultValue={data.discount}
                {...register("discount",{required:true})}
              />
              {errors.discount?.type === "required" && <li className='text-danger'>Discount is required!</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Image cover</label>
              <input 
                className="form-control"  
                type="file" 
                name='img' 
                id="formFile"
                {...imgCover ? null : {...register("img",{required:true})} }
                // {...register("img",{required:true})}
              />
              {errors.img  && <li className='text-danger'>Image Cover is required!</li>}
            </div>
            <div className="text-center">
              <img className='mb-1 col-lg-6 col-sm-12' style={{border:"1px solid #ccc"}}  src={data.img}  Width={"100%"} />
              <div className='mx-auto'>
                <button className='btn btn-danger  mx-3' onClick = {handleDeteleCover}>{!imgCover ? "Đã xóa" : "Detele"}</button>
                { !imgCover? <button className='btn btn-primary mx-3' onClick = {handleUndoCover}>Hoàn tác</button> : ""}
              </div>
            </div>
            
            <div className="mt-5 mb-3">
              <label htmlFor="formFile" className="form-label">Image details</label>
              <input  
                className="form-control" 
                multiple  
                type="file" 
                name='imgDetail' 
                id="formFile"
                {...imgList.length != data.imgLg.length  ? null : {...register("imgDetail",{required:true})} }
                // {...register("imgDetail",{required:true})}
                />
                {errors.imgDetail && <li className='text-danger'>Image details is required!</li>}
            </div>
            <div className="row d-flex justify-content-between">
              {
                data.imgLg?.map((i,index) => {
                  return (
                    <div className='col-lg-6 col-sm-12 mb-5 text-center' key={index}>
                      <img src={i}  Width={"100%"} style={{border:"1px solid #ccc"}} className= "m-1"/>
                      <button className='btn btn-danger d-block mx-auto' onClick={() => handleDetele(index)}>Detele</button>
                    </div>
                  )
                })
              }
            
            </div>   
            <div className="mt-5 mb-5 text-center">
              <button type='submit' className='btn btn-primary mx-3 '>Update</button>
              <button className='btn btn-light mx-3' type='reset'>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
