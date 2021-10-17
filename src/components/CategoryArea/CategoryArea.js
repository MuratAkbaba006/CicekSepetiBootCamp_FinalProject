import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllCategories } from '../../actions/Category'
import { getByCategory } from '../../actions/Product'
import {UpperFirstLetter} from '../../utils/utils'
import { CategoryAreaContainer,Category } from './ScCategoryArea'

const CategoryArea = () => {
  const categories = useSelector((state) => state.category.categories)
  const allcategories = [{id:1,title:'Hepsi'},...categories,{id:2,title:'Diğer'}]
  const [current,setCurrent] = useState('Hepsi')
  const dispatch = useDispatch();

  const handleClick = (e,id) => {
    console.log(e);
    setCurrent(e.target.innerText);
    dispatch(getByCategory(id))

  }
  useEffect(() => {
    if(categories.length === 0)
    {
      dispatch(getAllCategories())
    }
  },[dispatch,categories])
  return (
    <CategoryAreaContainer >
      {allcategories.map((category)=><Category current={current} title={UpperFirstLetter(category.title)} key={category.id} onClick={(event)=>handleClick(event,category.id)}>{UpperFirstLetter(category.title)}</Category>)}
    </CategoryAreaContainer>
  )
}

export default CategoryArea

