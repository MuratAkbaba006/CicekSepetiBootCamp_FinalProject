import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllCategories } from '../../actions/Category'
import { getByCategory } from '../../actions/Product'
import {UpperFirstLetter} from '../../utils/utils'
import { CategoryAreaContainer,Category } from './ScCategoryArea'
import { useHistory,useLocation } from 'react-router'
const CategoryArea = () => {
  const urlParams = new URLSearchParams(useLocation().search);
  const categories = useSelector((state) => state.category.categories)
  const allcategories = [{id:'1',title:'Hepsi'},...categories,{id:'2',title:'Diğer'}]
  const [current,setCurrent] = useState( urlParams.get('category')===null ? '1':urlParams.get('category'))
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e,id,title) => {
    const params = new URLSearchParams();
    params.append("category",id);
    history.push({search: params.toString()})
    setCurrent(id);
    dispatch(getByCategory(id.toString()))

  }
  useEffect(() => {
    if(categories.length === 0)
    {
      dispatch(getAllCategories())
    }

    dispatch(getByCategory(current))

  },[dispatch,categories.current])



  return (
    <CategoryAreaContainer >
      {allcategories.map((category)=><Category current={current} id ={category.id} key={category.id} onClick={(event)=>handleClick(event,category.id,category.title)}>{UpperFirstLetter(category.title)}</Category>)}
    </CategoryAreaContainer>
  )
}

export default CategoryArea

