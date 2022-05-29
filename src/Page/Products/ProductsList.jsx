import React from 'react';
import { useState } from 'react';
import {BsPencilSquare } from "react-icons/bs";
import {AiOutlineCloseCircle} from "react-icons/ai";
import { removeProduct } from '../../store/slices/product.slice';
import Loading from '../../Component/Loading/Loading';
import { useDispatch ,useSelector} from 'react-redux';
import { selectAllProducts } from '../../store/slices/product.slice';
import { useGetAllProductsQuery } from '../../services/product.service';
import Pagination from '../../Component/Pagination/Pagination';
import "./products.css";
import { formatter } from '../../util';
import { Link } from 'react-router-dom';

export default function ProductsList() {
  const dispatch = useDispatch()
  const {data,isFetching,error} = useGetAllProductsQuery()
  const listProducts = useSelector(selectAllProducts)
  const [currentPage,setCurrentPage] = useState(1)
  const [productsPerPage,setProductsPerPage] = useState(7)

  const indexOfLastProducts = currentPage*productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const handleDetele =  async(id) => {
    await fetch('https://ecommerce-hyy.herokuapp.com/products/' + id, { method: 'DELETE',})
    dispatch(removeProduct(id))
  }

  if(error) {
    return <p>Có lỗi xảy ra !!!</p>
  }
  if(isFetching && !data){
    return <Loading/>
  }


  const currentProducts = listProducts.slice(indexOfFirstProducts,indexOfLastProducts)
  const totalProducts = listProducts.length
  const handleSetCurrentPagePage = (e) => {
    setCurrentPage(e)
  }
  const handleNext = () =>{
    setCurrentPage(currentPage+1)
  }
  const handlePrev = () => {
    setCurrentPage(currentPage-1)
  }
  console.log(data);


  return (
    <div style={{overflowX: "auto"}}>
      <table className='table text-center align-middle' id='list-products'> 
        <thead>
          <tr>
            <th scope='col'>STT</th>
            <th scope='col'>Image</th>
            <th scope='col'>Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Size</th>
            <th scope='col'>Price</th>
            <th scope='col'>Sale</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
           currentProducts.map((item,index) => {
              return(
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>
                    <img src={item.img} alt={item.name} style={{width:"100px",height:"100px"}}/>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.inStock}</td>
                  <td>{item.list_size.map(item=>{
                    return `${item}/`
                  })}</td>
                  <td>{formatter.format(item.price)}đ</td>
                  <td>{item.discount *100}%</td>
                  <td>
                    <Link to={`/products/${item.id}`}>
                      <button className='btn-link btn' >
                        <BsPencilSquare/>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className='btn-remove' 
                      onClick={() => handleDetele (item.id)}
                    >
                        <AiOutlineCloseCircle/>
                    </button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
        <tfoot>

        </tfoot>

      </table>
      <div className='d-flex justify-content-center mb-5'>
        <Pagination 
                totalProducts = {totalProducts} 
                productsPerPage = {productsPerPage}
                currentPage = {currentPage}
                handleSetCurrentPagePage={handleSetCurrentPagePage}
                handleNext = {handleNext}
                handlePrev = {handlePrev}
          />
      </div>
    </div>
  )
      }

