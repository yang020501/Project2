import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'

const Products = () => {
  const create = () => {
    console.log("Hello");
  }

  return (
    <ContentMain headerTitle='Sản phẩm'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: create
      }} >


    </ContentMain>
  )
}

export default Products