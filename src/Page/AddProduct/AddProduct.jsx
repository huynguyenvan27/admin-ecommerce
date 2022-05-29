import React, { useEffect ,useState} from 'react'
import { useCreateProductMutation } from '../../services/product.service'
import { useForm } from 'react-hook-form'
import Loading from '../../Component/Loading/Loading'
import SizeList from './SizeList'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import { convertBase64 } from '../../util'

export default function AddProduct() {
  const [createProduct,{isError,isSuccess,isLoading}] = useCreateProductMutation()

  // handleSize
  const  [size,setSize] = useState([])
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

  // validation form

  const {handleSubmit,register,formState:{errors},reset,getValues} = useForm()

    const onSubmit = async (data) => {
      console.log("data",data);
      // Convert file image to base 64
      const arr = []
      for (let i = 0; i < data.imgDetail.length; i++) {
        arr.push(convertBase64 (data.imgDetail[i]))
      }
      const base64Detail = await Promise.all(arr)

      // Convert file image to base 64
      const base64Cover = await convertBase64 (data.img[0]);
     
      await createProduct({
        ...data,
        "list_size" : [...size],
        "imgDetail" : [...base64Detail],
        "img"  : base64Cover,
        "imgLg" : [...base64Detail],
        "isNew": true,
        "isWishlist": false
      })
      
      toast.success(`
      Đã thêm sản phẩm thành công`,{
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
      reset()
  }
  if(isLoading){
    return <Loading/>
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
                {...register("brand",{required:true})}
                />
                {errors.brand?.type === "required" && <li className='text-danger'>Brand is required!</li>}
            </div>

            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Chọn Size</label>
              <SizeList handleSize = {handleSize} />
              {/* {errors.size && <li>Size is required!</li>} */}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input 
                type="number" 
                className="form-control" 
                name='price' 
                id="price"
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
                {...register("inStock",{required:true})}
              />
              {errors.inStock?.type === "required" && <li className='text-danger'>Quantity is required!</li>}
            </div>
            <div className="mb-3">
              <label htmlFor="sale" className="form-label">Sale</label>
              <input 

                className="form-control" 
                name='discount' 
                id="sale"
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
                {...register("img",{required:true})}
              />
               {errors.img  && <li className='text-danger'>Image Cover is required!</li>}
            </div>
              {/* <img src={imgCover}  width={"300px"} /> */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Image details</label>
              <input  
                className="form-control" 
                multiple  
                type="file" 
                name='imgDetail' 
                id="formFile"
                
                {...register("imgDetail",{required:true})}
                />
                {errors.imgDetail && <li className='text-danger'>Image details is required!</li>}
            </div>
            
            {/* {
              imgDetails?.map(i => {
                return <img src={i}  width={"300px"} />
              })
            } */}
            <div className="mt-5 mb-5 text-center">
              <button type='submit' className='btn btn-primary me-5'>ADD</button>
              <button type='reset' className='btn btn-light'>Reset</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer style={{fontSize : "16px"}}/>
    </div>
  )
}
