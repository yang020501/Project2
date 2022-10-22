import React, { useEffect, useState, useCallback, useRef } from 'react'
import Helmet from '../components/Helmet'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import gender from '../assets/fake-data/gender'
import CheckBox from '../components/CheckBox'
import Button from '../components/Button'
import CatalogNotFound from '../components/CatalogNotFound'
import InfinityList from '../components/InfinityList'
import { getAllclothes } from '../redux/product/clothesSlice'
import { useDispatch, useSelector } from 'react-redux'
const Catalog = () => {
  const Clothes = useSelector(state => state.clothesSlice.value)
  const dispatch = useDispatch()
  const initFilter = {
    category: [],
    color: [],
    size: [],
    gender: []

  }
  const [productList, setProductList] = useState();
  const [products, setProducts] = useState()
  const [filter, setFilter] = useState(initFilter)

  const filterSelect = (type, checked, item) => {  
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] })
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] })
          break;
        case "GENDER":
          setFilter({ ...filter, gender: [...filter.gender, item.value] })
          break;
        default:
      }
    }
    else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(e => e !== item.categorySlug)
          setFilter({ ...filter, category: newCategory })
          break;
        case "COLOR":
          const newColor = filter.color.filter(e => e !== item.color)
          setFilter({ ...filter, color: newColor })
          break;
        case "SIZE":
          const newSize = filter.size.filter(e => e !== item.size)
          setFilter({ ...filter, size: newSize })
          break;
        case "GENDER":
          const newGender = filter.gender.filter(e => e !== item.value)
          setFilter({ ...filter, gender: newGender })
          break;
        default:

      }
    }
  }
  const clearFilter = () => {
    setFilter(initFilter)
  }
  const updateProducts = useCallback(
    () => {
      let temp = productList
      if (filter.category.length > 0) {
        temp = temp.filter(e => filter.category.includes(e.categorySlug))
      }
      if (filter.color.length > 0) {
        temp = temp.filter(e => {
          const check = e.colors.split(",").find(color => filter.color.includes(color))
          return check !== undefined
        })
      }
      if (filter.size.length > 0) {
        temp = temp.filter(e => {
          const check = e.size.split(",").find(size => filter.size.includes(size))
          return check !== undefined
        })
      }
      if (filter.gender.length > 0) {
        temp = temp.filter(e => filter.gender.includes(e.gender))
      }
      setProducts(temp)
    },
    [filter, setProducts],
  )
  useEffect(() => {
    updateProducts();
  }, [updateProducts])
  const filterRef = useRef(null)
  useEffect(() => {
    dispatch(getAllclothes())
  }, [])
  useEffect(() => {
    setProductList(Clothes)
    setProducts(Clothes)
  }, [Clothes])

  const showHideFilter = () => filterRef.current.classList.toggle('active')
  return (
    <Helmet title='Quần áo'>
      <div className="catalog">
        <div className="catalog-filter " ref={filterRef}>
          <div className="catalog-filter-close" onClick={() => { showHideFilter() }}>
            <i className='bx bx-left-arrow-alt'></i>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Giới tính
            </div>
            <div className="catalog-widget-filter-content">
              {

                gender.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("GENDER", input.checked, item) }}
                      checked={filter.gender.includes(item.value)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Danh mục sản phẩm
            </div>
            <div className="catalog-widget-filter-content">
              {

                category.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("CATEGORY", input.checked, item) }}
                      checked={filter.category.includes(item.categorySlug)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              màu sắc
            </div>
            <div className="catalog-widget-filter-content">
              {
                colors.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("COLOR", input.checked, item) }}
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Kích cỡ
            </div>
            <div className="catalog-widget-filter-content">
              {
                size.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("SIZE", input.checked, item) }}
                      checked={filter.size.includes(item.size)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-content">
              <Button size='sm' onclick={clearFilter}>Xóa bộ lọc</Button>
            </div>
          </div>
        </div>
        <div className="catalog-filter-toggle">
          <Button size="sm" onclick={() => { showHideFilter() }}>bộ lọc</Button>
        </div>
        <div className="catalog-content">
          {products ?
            products.length == 0 ?
              <CatalogNotFound />
              :
              <InfinityList data={products} />
            : <></>
          }
        </div>
      </div>
    </Helmet>
  )
}


export default Catalog