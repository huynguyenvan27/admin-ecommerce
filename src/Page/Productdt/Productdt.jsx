import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../../services/product.service'
import { useForm } from 'react-hook-form'
import { useGetProductByIdQuery } from '../../services/product.service'
import { useState } from 'react'
import { convertBase64 } from '../../util'
import Loading from '../../Component/Loading/Loading'
export default function Productdt() {
  const {id} = useParams()
  const  [size,setSize] = useState([])
  const {data,isFetching,isSuccess} = useGetProductByIdQuery(id)

  const [updateProduct,{isLoading}] = useUpdateProductMutation()

  const {handleSubmit,register,formState:{errors},reset,getValues} = useForm()

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
  const [imgCover,setImgCover] = useState(false)

  const handleDeteleCover = () => {
    setImgCover(true)
  }
  
  
  const onSubmit = async (product) => {
    const arr = []

    for (let i = 0; i < product.imgDetail?.length; i++) {
      arr.push(convertBase64 (product.imgDetail[i]))
    }
    // Convert file image to base 64
    const base64Detail = await Promise.all(arr)
    const base64Cover = ""
    if(product.img){
      base64Cover = await convertBase64 (product.img[0]) ;
    }
    const list = [...data.imgLg].filter((item,id) => !imgList.includes(id))
    const newData = {
      ...product,
      id : data.id,
      img : data.img.concat(base64Cover),
      imgDetail:[...list].concat([...base64Detail]),
      imgLg: [...list].concat([...base64Detail]),
      list_size : [...size]
  }
  console.log(newData);
    await(updateProduct(newData)
    )
  }

  function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
  }

  var result = range(35, 45, 0.5);

  if(isFetching){
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
                {...imgCover ?  {...register("img",{required:true})} : null }
                // {...register("img",{required:true})}
              />
              {errors.img  && <li className='text-danger'>Image Cover is required!</li>}
            </div>
            <div className="text-center">
              <img className='mb-1 col-lg-6 col-sm-12' style={{border:"1px solid #ccc"}}  src={data.img}  Width={"100%"} />
              <button className='btn btn-danger d-block mx-auto' onClick = {handleDeteleCover}>Detele</button>
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
                data.imgLg?.map((i,id) => {
                  return (
                    <div className='col-lg-6 col-sm-12 mb-5 text-center' key={id}>
                      <img src={i}  Width={"100%"} style={{border:"1px solid #ccc"}} className= "m-1"/>
                      <button className='btn btn-danger d-block mx-auto' onClick={() => handleDetele(id)}>Detele</button>
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
