import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import App from './App'
import Layout from './Component/Layout';
import './index.css'
import Blog from './Page/Blog/Blog'
import Products from './Page/Products/Products'
import Users from './Page/Users/Users'
import {Provider} from "react-redux"
import store from "../src/store/store"
import AddProduct from './Page/AddProduct/AddProduct'
import Productdt from './Page/Productdt/Productdt'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
            </Route>
            <Route path='/' element={<Layout/>}>
              <Route path='/users' element={<Users/>}/>
              <Route path='/blog' element={<Blog/>}/>
              <Route path='/Products' element={<Products/>}/>
              <Route path='/add-product' element={<AddProduct/>}/>
              <Route path='/products/:id' element={<Productdt/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
