import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getAllProducts,getByCategory} from '../../actions/Product'
import styled from 'styled-components'
import Product from '../Product/Product'
import { useLocation } from 'react-router'
import { addNotification } from '../../actions/Notification'
import {v4 as uuid} from 'uuid'
const ProductList = () => {
  const urlParams = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status)
  const filter = useSelector((state) => state.product.filteredproductsList);

  // useEffect(() => {
  //   console.log('useEffect dispatch')
  //   dispatch(addNotification({id:uuid(),type:'SUCCESS',message:'Başarılı'}))
  //   dispatch(addNotification({id:uuid(),type:'WARNING',message:'UYARI'}))
  // },[])

  if(status === 'loading')
  {
    return <div>Loding...</div>
  }
  return (
    <GridContainer>
      {filter.map((product)=><Product key={product.id} product={product}/>)}
    </GridContainer>
  )
}

export default ProductList

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 10px;
  gap: 5px;
  width: 86%;
  background-color: #F2F2F2;
`
