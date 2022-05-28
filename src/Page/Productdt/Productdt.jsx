import React from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../../services/product.service'
import { useForm } from 'react-hook-form'
import { useGetProductByIdQuery } from '../../services/product.service'
import SizeList from '../AddProduct/SizeList'
import { useState } from 'react'
export default function Productdt() {
  const  [size,setSize] = useState([])
  const {id} = useParams()
  const {data,isFetching,isSuccess} = useGetProductByIdQuery(id)
  const [updateProduct] = useUpdateProductMutation()

  const {handleSubmit,register,formState:{errors},reset,getValues} = useForm()

  
  const convertBase64 = (file) => {
    return new Promise((resolve,rejected) =>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () =>{
        resolve(fileReader.result)
      };
      fileReader.onerror = error =>{
        rejected(error)
      }
    })
  }
  
  const handleSize  = (e) => {
    if(e.target.checked){
      setSize([
        ...size,
        e.target.value
      ])
    }else{
      const filter = size.filter(item => item !== e.target.value)
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
  console.log(imgList);
  const [imgCover,setImgCover] = useState(false)

  const handleDeteleCover = () => {
    setImgCover(true)
  }
  const list = [];
  const onSubmit = async (user) => {
    const list = [...data.imgLg].filter((item,id) => !imgList.includes(id))
    await(updateProduct({
      img : [...data.img],
        ...user,
        imgDetail:[...list],
        imgLg: [...list]
    })
    )
    console.log(
      { 
        img : [...data.img],
        ...user,
        imgDetail:[...list],
        imgLg: [...list]
      }
      
      );
  }
  
  if(isFetching){
    return <p>...isLoading</p>
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
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
              <SizeList handleSize = {handleSize} />
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
              <img className='mb-1'  src={data.img}  width={"300px"} />
              <button className='btn btn-danger d-block mx-auto' >Detele</button>
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
                {errors.imgDetail && <li className='text-danger' onClick={handleDeteleCover}>Image details is required!</li>}
            </div>
            <div className="row d-flex justify-content-between">
              {
                data.imgLg?.map((i,id) => {
                  return (
                    <div className='col-6 mb-5 text-center'>
                      <img src={i}  width={"300px"} className= "m-1"/>
                      <button className='btn btn-danger d-block mx-auto' onClick={() => handleDetele(id)}>Detele</button>
                    </div>
                  )
                })
              }
            
            </div>   
            <div className="mt-5 mb-5 text-center">
              <button type='submit' className='btn btn-primary me-5 '>Update</button>
              <button className='btn btn-light' type='reset'>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
